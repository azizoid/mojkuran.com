// Cloudflare Worker fronting the static export: /api/v2/* (random, status),
// the new /api/v3/search, and /search/* rewrites onto the search app shell.
// Everything else is served directly from static assets (run_worker_first
// lists only /api/*, /search/* and /data/* in wrangler.jsonc).
//
// Private records and the serialized MiniSearch index are fetched from R2 and
// memoized per isolate; /data/* remains a public 404 route.

import { soorahList } from '../src/assets/soorah-list-object'
import { initialPaginate } from '../src/helpers/paginate'
import type { DisplayData, ResponseErrorType, ResponseProps } from '../src/helpers/types'
import { matchedText, normalizeBosnian } from '../src/search/normalizeBosnian.mjs'
import { getView } from '../src/utility/getView'
import { selectRandomItems } from '../src/utility/selectRandomItems'
import MiniSearch from 'minisearch'

type R2Object = { json: <T>() => Promise<T>; text: () => Promise<string> }
type R2Bucket = { get: (key: string) => Promise<R2Object | null> }
type Env = {
  ASSETS: { fetch: (request: string | Request) => Promise<Response> }
  SEARCH_DATA: R2Bucket
}

type ApiRecord = { id: number; content: string; content_latinized: string }
type SearchDocument = { id: number; soorah: number; ayah: number; content: string }
type SearchCandidate = { id: number; score: number; matches: string[] }

type ApiIndex = {
  // sorted by soorah then ayah, so matches walk out already in response order
  order: { soorah: number; ayah: number; rec: ApiRecord }[]
  // Bosnian-folded source text for the existing substring search, once per isolate
  normalized: string[]
  byId: Map<number, { soorah: number; ayah: number; rec: ApiRecord }>
}

let apiIndex: Promise<ApiIndex> | null = null
let searchIndex: Promise<MiniSearch<SearchDocument>> | null = null
const SEARCH_DATA_VERSION = 'v1'

const SEARCH_INDEX_OPTIONS = {
  fields: ['content'],
  storeFields: ['soorah', 'ayah'],
  processTerm: normalizeBosnian,
}

const fuzzyDistance = (term: string) => {
  if (term.length >= 7) return 2
  if (term.length >= 4) return 1
  return false
}

const getPrivateJson = async <T>(env: Env, key: string): Promise<T> => {
  const object = await env.SEARCH_DATA.get(`mojkuran/${SEARCH_DATA_VERSION}/${key}`)
  if (!object) throw new Error(`Missing private search data: ${key}`)
  return object.json<T>()
}

const readLimitedBody = async (request: Request, limit: number): Promise<string | null> => {
  const reader = request.body?.getReader()
  if (!reader) return ''

  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > limit) {
      await reader.cancel()
      return null
    }
    chunks.push(value)
  }

  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }
  return new TextDecoder().decode(bytes)
}

const loadData = (env: Env) => {
  apiIndex ??= (async () => {
    const records = await getPrivateJson<Record<string, ApiRecord>>(env, 'records.json')
    const order = Object.entries(records)
      .map(([key, rec]) => {
        const [soorah, ayah] = key.split(':').map(Number)
        return { soorah, ayah, rec }
      })
      .sort((a, b) => a.soorah - b.soorah || a.ayah - b.ayah)
    return {
      order,
      normalized: order.map((o) => normalizeBosnian(o.rec.content)),
      byId: new Map(order.map((record) => [record.rec.id, record])),
    }
  })()
  return apiIndex
}

const loadSearchIndex = (env: Env) => {
  searchIndex ??= (async () => {
    const object = await env.SEARCH_DATA.get(
      `mojkuran/${SEARCH_DATA_VERSION}/search-index.json`
    )
    if (!object) throw new Error('Missing private search index')
    return MiniSearch.loadJSON<SearchDocument>(await object.text(), SEARCH_INDEX_OPTIONS)
  })()
  return searchIndex
}

const searchService = async (request: Request, env: Env) => {
  try {
    const contentLength = Number(request.headers.get('content-length'))
    if (Number.isFinite(contentLength) && contentLength > 4096) {
      return Response.json({ error: 'Search request is too large' }, { status: 413 })
    }

    const bodyText = await readLimitedBody(request, 4096)
    if (bodyText === null) {
      return Response.json({ error: 'Search request is too large' }, { status: 413 })
    }

    let body: { search?: unknown; page?: unknown }
    try {
      body = JSON.parse(bodyText) as typeof body
    } catch {
      return Response.json({ error: 'Invalid search request' }, { status: 400 })
    }

    if (typeof body?.search !== 'string') {
      return Response.json({ error: 'Search query is required' }, { status: 400 })
    }

    const rawSearch = body.search.trim()
    if (rawSearch.length > 128 || rawSearch.split(/\s+/).length > 8) {
      return Response.json({ error: 'Search query is too long' }, { status: 400 })
    }

    const search = normalizeBosnian(rawSearch)

    if (!search) {
      return Response.json({ error: 'Search query is required' }, { status: 400 })
    }

    const currentPage = body.page === undefined ? 1 : Number(body.page)
    if (!Number.isSafeInteger(currentPage) || currentPage < 1) {
      return Response.json({ error: 'Invalid page' }, { status: 400 })
    }

    const { order, normalized, byId } = await loadData(env)

    const perPage = initialPaginate.perPage
    const skip = (currentPage - 1) * perPage

    const exactHits: DisplayData[] = []
    const exactIds = new Set<number>()
    for (let i = 0; i < normalized.length; i++) {
      if (!normalized[i].includes(search)) continue
      const record = order[i]
      exactIds.add(record.rec.id)
      exactHits.push({
        id: record.rec.id,
        soorah: record.soorah,
        ayah: record.ayah,
        content: record.rec.content,
        matches: [matchedText(record.rec.content, search) ?? rawSearch],
      })
    }

    const fuzzyHits: DisplayData[] = []
    if (search.split(/\s+/).some((term) => fuzzyDistance(term) !== false)) {
      const index = await loadSearchIndex(env)
      const candidates: SearchCandidate[] = index
        .search(search, { fuzzy: fuzzyDistance, combineWith: 'AND' })
        .filter((result) => !exactIds.has(Number(result.id)))
        .flatMap((result) => {
          const record = byId.get(Number(result.id))
          if (!record) return []
          const matches = result.terms
            .map((term) => matchedText(record.rec.content, term))
            .filter((match): match is string => Boolean(match))
          return [{ id: Number(result.id), score: result.score, matches }]
        })
        .sort((a, b) => b.score - a.score)

      for (const candidate of candidates) {
        const record = byId.get(candidate.id)
        if (!record) continue
        fuzzyHits.push({
          id: candidate.id,
          soorah: record.soorah,
          ayah: record.ayah,
          content: record.rec.content,
          matches: candidate.matches,
        })
      }
    }

    // Keep literal/folded substring hits in Quran order, followed by fuzzy results
    // ranked by MiniSearch. This retains existing matches while making typo hits visible.
    const hits = [...exactHits, ...fuzzyHits]
    const out = hits.slice(skip, skip + perPage)

    // v2 contract kept: empty page → "no results" body (even past the end)
    const payload: ResponseProps | ResponseErrorType = out.length
      ? {
          out,
          data: getView({ q: search, t: 1 }),
          paginate: { total: hits.length, perPage, currentPage },
        }
      : { out: null, error: 'No results found for the given search query.' }

    return Response.json(payload, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const randomService = async (env: Env) => {
  try {
    const { order } = await loadData(env)
    const pick = order[Math.floor(Math.random() * order.length)]

    return Response.json(
      {
        id: pick.rec.id,
        soorah: pick.soorah,
        ayah: pick.ayah,
        content: pick.rec.content,
        content_latinized: pick.rec.content_latinized,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const { pathname } = url
    const base = `${url.protocol}//${url.host}`

    if (pathname.startsWith('/data/')) {
      // private search data is available only through the R2 binding
      return Response.json({ error: 'Not found' }, { status: 404 })
    }

    if (pathname.startsWith('/api/')) {
      switch (pathname) {
        // Keep the current live site compatible until its static frontend is cut over.
        case '/api/v2/search':
        case '/api/v3/search':
          if (request.method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 })
          }
          return searchService(request, env)

        case '/api/v2/random':
          if (request.method !== 'GET') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 })
          }
          return randomService(env)

        case '/api/v2/random/topbar':
          return Response.json(selectRandomItems(soorahList, 3))

        case '/api/v2/status':
          return Response.json({ message: 'Up' })

        default:
          return Response.json({ error: 'Not found' }, { status: 404 })
      }
    }

    // bare /search keeps its old 404; only /search/{query} gets the shell
    if (pathname.startsWith('/search/')) {
      return env.ASSETS.fetch(`${base}/search/app`)
    }

    return env.ASSETS.fetch(request)
  },
}
