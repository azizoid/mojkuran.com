import { NextApiRequest, NextApiResponse } from "next"
import { Db } from "mongodb"
import { BaseAyahProps, DataProps, ResponseData } from "../../lib/db-types"
import { withMongo } from "../../lib/mongodb"
import { NextResponse } from "next/server"

export type ReponseProps = {
  out?: BaseAyahProps
} & ResponseData

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps>
) => {
  switch (req.method) {
    case "GET":
      try {
        const randomAyah = await withMongo(async (db: Db) => {
          const pipeline = [{ $sample: { size: 1 } }]
          const collection = db.collection<BaseAyahProps>('mojkuran')
          return await collection.aggregate(pipeline).next()
        })

        const { soorah, ayah, content } = randomAyah

        return res.json({ out: { soorah, ayah, content }, success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(405).json({ success: false })
      break
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
