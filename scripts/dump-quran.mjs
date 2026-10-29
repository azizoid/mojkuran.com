// Restructures the two raw source JSONs into the app's build-time data files.
// Usage: node scripts/dump-quran.mjs  (inputs: QURAN_DATA_DIR, default below)
// Writes: src/data/quran/{1..114}.json (build-time pages). Run
// `pnpm build:search-data` afterward to create private Worker data in .worker-data/.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const RAW_DIR = process.env.QURAN_DATA_DIR || '/Users/azizoid/do/quran-app/quran.az/data'
const OUT_DIR = path.resolve('src/data')
const AYAHS_FILE = path.join(RAW_DIR, 'quran.mojkuran.json')
const META_FILE = path.join(RAW_DIR, 'quran.metadata.json')

const assert = (cond, msg) => {
  if (!cond) {
    console.error(`✗ FAIL: ${msg}`)
    process.exit(1)
  }
}

const read = async (file) => JSON.parse(await readFile(file, 'utf8'))
const at = (doc = { $oid: undefined }) => doc?.$oid ?? doc?._id?.$oid

const [ayahs, metas] = await Promise.all([read(AYAHS_FILE), read(META_FILE)])

assert(ayahs.length === 6236, `expected 6236 ayahs, got ${ayahs.length}`)
assert(metas.length === 6236, `expected 6236 metadata, got ${metas.length}`)

// id must be a unique 1..6236 range (random pick depends on it)
const ids = new Set(ayahs.map((a) => Number(a.id)))
assert(ids.size === 6236, `ayah ids not unique (${ids.size})`)
assert(Math.min(...ids) === 1 && Math.max(...ids) === 6236, 'ids must be 1..6236')

// every ayah joins exactly one metadata doc
const byOid = new Map(metas.map((m) => [at(m), m]))
let joined = 0
const soorahs = new Map()
for (const a of ayahs) {
  const m = byOid.get(at(a.metadata_id))
  assert(m, `unjoined metadata_id on soorah ${a.soorah} ayah ${a.ayah}`)
  assert(m.soorah_id === a.soorah && m.aya_id === a.ayah, `join mismatch on id ${a.id}`)
  assert(typeof a.content === 'string' && a.content.length > 0, `empty content id ${a.id}`)
  assert(typeof m.content === 'string' && m.content.length > 0, `empty arabic id ${a.id}`)
  joined++

  const s = soorahs.get(a.soorah) ?? []
  s.push({
    id: a.id,
    soorah: a.soorah,
    ayah: a.ayah,
    content: a.content,
    content_latinized: a.content_latinized ?? a.content,
    arabic: m.content,
    transliteration: m.transliteration,
    juz: m.juz,
  })
  soorahs.set(a.soorah, s)
}

assert(joined === 6236, `joined ${joined}/6236`)
assert(soorahs.size === 114, `expected 114 soorahs, got ${soorahs.size}`)

// unique soorah:ayah per file (duplicate ayah numbers would make URLs ambiguous)
const seen = new Set()
for (const list of soorahs.values()) {
  for (const a of list) {
    const key = `${a.soorah}:${a.ayah}`
    assert(!seen.has(key), `duplicate ayah ${key}`)
    seen.add(key)
  }
}
assert(seen.size === 6236, `expected 6236 unique keys, got ${seen.size}`)

// purge src/data fresh so retired files (old corpus/manifest) never linger
await rm(OUT_DIR, { recursive: true, force: true })
await mkdir(OUT_DIR, { recursive: true })

await mkdir(path.join(OUT_DIR, 'quran'), { recursive: true })
for (const [soorah, list] of soorahs) {
  list.sort((x, y) => x.ayah - y.ayah)
  await writeFile(path.join(OUT_DIR, 'quran', `${soorah}.json`), JSON.stringify(list))
}

console.log(`✓ ${joined} records, ${soorahs.size} soorahs joined 1:1; run pnpm build:search-data`)
