'use server-only'
import type { QuranRecord } from '@/utility/quranData'
import { loadSoorah } from '@/utility/quranData'

import type { GetSoorahServiceProps } from '../getSoorahService'

interface GetAyahServiceProps extends GetSoorahServiceProps {
  ayah: number
}

export type AyahResponseType = QuranRecord & {
  prev: number | null
  next: number | null
}

export const getAyahService = async ({ soorah, ayah }: GetAyahServiceProps) => {
  const list = await loadSoorah({ soorah })

  const out = list.find((item) => item.ayah === ayah)

  if (!out) {
    throw new Error(`Ayah not found: soorah: ${soorah}, ayah: ${ayah}`)
  }

  return {
    ...out,
    prev: out.ayah > 1 ? out.ayah - 1 : null,
    next: out.ayah < list.length ? out.ayah + 1 : null,
  } satisfies AyahResponseType
}
