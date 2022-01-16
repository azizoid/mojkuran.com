import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { withMongo } from '../../../lib/mongodb'
import { FormProps } from '../../../lib/types'

import { getView } from '../../../utility/getView/getView';
import { DisplayData } from '../../../lib/types';
import { DataPropsLatinized, ResponseData } from '../../../lib/db-types';

export type ReponseProps = {
  out?: DisplayData[],
  data?: FormProps
} & ResponseData

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps>
) => {
  const { query, method } = req

  const soorah = Number(query.soorah.toString())
  const data = getView({ s: soorah })

  if (data.view === 'empty') {
    return res.status(400).json({ success: false })
  }

  switch (method) {
    case 'GET':
      try {
        const out = await withMongo(async (db: Db) => {
          const collection = db.collection<DataPropsLatinized>('mojkuran')
          return await collection.find({ soorah }).sort(['soorah', 'ayah']).toArray()
        })
        return res.json({ out, data, success: true })
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