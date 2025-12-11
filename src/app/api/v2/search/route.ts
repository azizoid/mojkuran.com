import type { Db } from 'mongodb'
import { NextResponse } from 'next/server'
import { initialPaginate } from '@/helpers/paginate'
import type { DataPropsLatinized, DisplayData, ResponseErrorType } from '@/helpers/types'
import { type FormProps, getView } from '@/utility/getView'
import { withMongo } from '@/utility/mongodb'

export type ResponseProps = {
  out: DisplayData[]
  data?: FormProps
  paginate?: {
    total: number
    perPage: number
    currentPage: number
  }
}

const REGEX_SANITIZE = /[-/\\^$*+?.()|[\]{}]/g
const REGEX_DIACRITICS = /[\u0300-\u036f]/g

export const POST = async (req: Request) => {
  try {
    const content = await req.json()

    const { search: searchParam, page } = content

    const search = searchParam
      ?.toString()
      .replace(REGEX_SANITIZE, '\\$&')
      .normalize('NFD')
      .replace(REGEX_DIACRITICS, '')
      .trim() as string

    if (!search) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
    }

    const currentPage = Number(page?.toString()) || 1

    const limit = initialPaginate.perPage
    const skip = (currentPage - 1) * limit

    const data = getView({
      q: search,
      t: 1,
    })

    let ayahsCount = 0

    const ayahs = await withMongo(async (db: Db) => {
      const collection = db.collection<DataPropsLatinized>('mojkuran')

      if (!data.q) return [] // very rare edge case

      const searchQuery = {
        content_latinized: { $regex: data.q, $options: 'i' },
      }

      ayahsCount = await collection.countDocuments(searchQuery)

      const result = await collection
        .find(searchQuery, { projection: { _id: 0 } })
        .sort({ soorah: 1, ayah: 1 }) // Sort by soorah in ascending order, then by ayah in ascending order
        .skip(skip)
        .limit(limit)
        .toArray()

      return result
    })

    if (ayahs.length === 0) {
      return NextResponse.json<ResponseErrorType>(
        {
          out: null,
          error: 'No results found for the given search query.',
        },
        { status: 200 }
      )
    }

    return NextResponse.json<ResponseProps>(
      {
        out: ayahs,
        data,
        paginate: {
          ...initialPaginate,
          total: ayahsCount,
          currentPage,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
