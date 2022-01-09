import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { withMongo } from '../../../lib/mongodb'
import { DataProps, ResponseData } from '../../../lib/db-types'
import { initialPaginate, paginate } from '../../../utility/paginate/paginate'
import { DisplayData } from '../../../lib/types'

export type ReponseProps = {
  out: DisplayData[],
  paginate: {
    total: number;
    perPage: number;
    currentPage: number
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps | ResponseData>
) => {
  const { query, method } = req

  const search_query = (query.search.toString()).replace(/"/g, '\\\"');
  const currentPage = Number(query.page?.toString()) || 1

  switch (method) {
    case 'GET':
      try {
        const ayahs = await withMongo(async (db: Db) => {
          const collection = db.collection<DataProps>('qurans')
          return await collection.find({
            content: { $regex: `.*${search_query}.*` }
          }, {}).toArray()
        })
        const out = paginate(ayahs, initialPaginate.perPage, currentPage)
          .map(({ _id, soorah_id, aya_id, content }) =>
            ({ id: _id, soorah: soorah_id, ayah: aya_id, content }))

        return res.json({
          out,
          paginate: {
            ...initialPaginate,
            total: ayahs.length,
            currentPage
          }
        })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
export default handler