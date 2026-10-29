'use server-only'
import type { DisplayData } from '@/helpers/types'
import { loadSoorah } from '@/utility/quranData'

export interface GetSoorahServiceProps {
  soorah: number
}

export const getSoorahService = async ({ soorah }: GetSoorahServiceProps) => {
  const out = await loadSoorah({ soorah })

  if (!out) {
    throw new Error(`Soorah not found: { soorah: ${soorah}}`)
  }

  return out satisfies DisplayData[]
}
