import { NextApiRequest, NextApiResponse } from "next"
import { Db } from "mongodb"
import { DisplayData } from "../../lib/types"
import { DataProps, ResponseData } from "../../lib/db-types"
import { withMongo } from "../../lib/mongodb"

export type ReponseProps = {
  out?: DisplayData
} & ResponseData

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps>
) => {
  switch (req.method) {
    case "GET":
      try {
        const random = await withMongo(async (db: Db) =>
          db
            .collection<DataProps>("qurans")
            .aggregate([{ $sample: { size: 1 } }])
            .toArray()
            .then((data) => ({
              id: data[0]["_id"],
              soorah: data[0]["soorah_id"],
              ayah: data[0]["aya_id"],
              content: data[0]["content"],
            }))
        )
        return res.json({ out: random, success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

// eslint-disable-next-line import/no-default-export
export default handler
