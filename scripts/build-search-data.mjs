import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import MiniSearch from 'minisearch'
import { normalizeBosnian } from '../src/search/normalizeBosnian.mjs'

const SOORAH_COUNT = 114
const AYAH_COUNT = 6236
const QURAN_DIR = path.resolve('src/data/quran')
const OUTPUT_DIR = path.resolve('.worker-data')

const records = Object.create(null)
const documents = []
const ids = new Set()

for (let soorah = 1; soorah <= SOORAH_COUNT; soorah++) {
  const ayahs = JSON.parse(await readFile(path.join(QURAN_DIR, `${soorah}.json`), 'utf8'))

  for (const ayah of ayahs) {
    if (
      !Number.isInteger(ayah.id) ||
      !Number.isInteger(ayah.ayah) ||
      typeof ayah.content !== 'string'
    ) {
      throw new Error(`Invalid Quran record at ${soorah}:${ayah.ayah}`)
    }
    if (ids.has(ayah.id)) throw new Error(`Duplicate Quran record id ${ayah.id}`)

    ids.add(ayah.id)
    const key = `${soorah}:${ayah.ayah}`
    if (Object.hasOwn(records, key)) throw new Error(`Duplicate Quran location ${key}`)
    records[key] = {
      id: ayah.id,
      content: ayah.content,
      content_latinized: ayah.content_latinized ?? ayah.content,
    }
    documents.push({ id: ayah.id, soorah, ayah: ayah.ayah, content: ayah.content })
  }
}

if (documents.length !== AYAH_COUNT || ids.size !== AYAH_COUNT) {
  throw new Error(`Expected ${AYAH_COUNT} unique ayahs, found ${documents.length}`)
}
if (Math.min(...ids) !== 1 || Math.max(...ids) !== AYAH_COUNT) {
  throw new Error(`Expected ayah ids 1–${AYAH_COUNT}`)
}

const index = new MiniSearch({
  fields: ['content'],
  storeFields: ['soorah', 'ayah'],
  processTerm: normalizeBosnian,
})
index.addAll(documents)

await mkdir(OUTPUT_DIR, { recursive: true })
await Promise.all([
  writeFile(path.join(OUTPUT_DIR, 'records.json'), JSON.stringify(records)),
  writeFile(path.join(OUTPUT_DIR, 'search-index.json'), JSON.stringify(index)),
])

console.log(`Built search data for ${documents.length} ayahs in ${OUTPUT_DIR}`)
