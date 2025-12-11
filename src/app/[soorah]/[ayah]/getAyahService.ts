import type { Db } from 'mongodb'

import type { DataPropsLatinized } from '@/helpers/types'
import { withMongo } from '@/utility/mongodb'

import type { GetSoorahServiceProps } from '../getSoorahService'

interface GetAyahServiceProps extends GetSoorahServiceProps {
  ayah: number
}

export type AyahResponseType = {
  id: string
  soorah: number
  ayah: number
  content: string
  content_latinized: string
  arabic: string
  transliteration: string
  juz: number
  prev: number | null
  next: number | null
}

export const getAyahService = async ({ soorah, ayah }: GetAyahServiceProps) => {
  const result = await withMongo(async (db: Db) => {
    const contentCollection = db.collection<DataPropsLatinized>('mojkuran')

    const content = await contentCollection.findOne(
      { soorah, ayah },
      {
        projection: {
          metadata_id: 1,
          _id: 0,
          id: 1,
          soorah: 1,
          ayah: 1,
          content: 1,
          content_latinized: 1,
        },
      }
    )

    if (!content) {
      throw new Error(`Ayah not found: soorah: ${soorah}, ayah: ${ayah}`)
    }

    const metadata = await db
      .collection('metadata')
      .findOne(
        { _id: content.metadata_id },
        { projection: { content: 1, transliteration: 1, juz: 1 } }
      )

    const prevAndNext = await contentCollection
      .find(
        { soorah, ayah: { $in: [content.ayah - 1, content.ayah + 1] } },
        { projection: { ayah: 1 } }
      )
      .toArray()

    const prev = prevAndNext.find((item) => item.ayah === content.ayah - 1)?.ayah || null
    const next = prevAndNext.find((item) => item.ayah === content.ayah + 1)?.ayah || null

    return {
      ...content,
      arabic: metadata?.content,
      transliteration: metadata?.transliteration,
      juz: metadata?.juz,
      prev,
      next,
    }
  })

  return result
}
