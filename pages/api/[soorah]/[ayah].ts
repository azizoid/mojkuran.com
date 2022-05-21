import { NextApiRequest, NextApiResponse } from "next"
import { Db } from "mongodb"
import { withMongo } from "../../../lib/mongodb"
import {
  DataPropsLatinized,
  DetailsTypes,
  ResponseData,
} from "../../../lib/db-types"
import { DataProps } from "../../../lib/db-types"
import { FormProps } from "../../../lib/types"
import { getView } from "../../../utility/getView/getView"

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

export type ReponseProps = {
  out?: AyahResponseType
  data?: FormProps
} & ResponseData

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps>
) => {
  const { query, method } = req

  const soorah = Number(query.soorah.toString())
  const ayah = Number(query.ayah.toString())
  const data = getView({ s: soorah, a: ayah })

  if (data.view === "empty") {
    return res.status(400).json({ success: false })
  }

  switch (method) {
    case "GET":
      try {
        const ayahs = await withMongo(async (db: Db) => {
          const contentCollection =
            db.collection<DataPropsLatinized>("mojkuran")
          const content = await contentCollection.findOne({
            soorah: data.s,
            ayah: Number(data.a),
          })

          const prev = await contentCollection
            .findOne({
              soorah: data.s,
              ayah: Number(data.a) - 1,
            })
            .then((data) => (data?.ayah ? data.ayah : null))
          const next = await contentCollection
            .findOne({
              soorah: data.s,
              ayah: Number(data.a) + 1,
            })
            .then((data) => (data?.ayah ? data.ayah : null))

          const detailsCollection = db.collection<DetailsTypes>("details")
          const details = await detailsCollection
            .findOne({
              soorah_id: data.s,
              aya_id: Number(data.a),
            })
            .then(({ content, transliteration, juz }) => ({
              arabic: content,
              transliteration,
              juz,
            }))

          return { ...content, ...details, prev, next }
        })
        return res.json({ out: ayahs, data, success: true })
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
