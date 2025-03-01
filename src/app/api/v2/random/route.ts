import { DataPropsLatinized } from '@/helpers/types'
import { withMongo } from '@/utility/mongodb'
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const randomAyah = await withMongo(async (db: Db) => {
      const pipeline = [{ $sample: { size: 1 } }]
      const collection = db.collection<DataPropsLatinized>('mojkuran')
      return await collection.aggregate(pipeline).next()
    })

    if (!randomAyah) {
      throw new Error('No random ayah found')
    }

    const { id, soorah, ayah, content, content_latinized } = randomAyah

    return NextResponse.json(
      { id, soorah, ayah, content, content_latinized },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
