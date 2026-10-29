'use server-only'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { DisplayData } from '@/helpers/types'

export type QuranRecord = DisplayData & {
  arabic: string
  transliteration: string
  juz: number
}

const dataDir = (soorah: number) =>
  path.join(process.cwd(), 'src', 'data', 'quran', `${soorah}.json`)

export const loadSoorah = async ({ soorah }: { soorah: number }): Promise<QuranRecord[]> => {
  const out: QuranRecord[] = JSON.parse(await readFile(dataDir(soorah), 'utf8'))

  if (!out) {
    throw new Error(`Soorah not found: { soorah: ${soorah}}`)
  }

  return out
}
