import { NextApiRequest, NextApiResponse } from 'next'
import { Db } from 'mongodb'
import { withMongo } from '../../../lib/mongodb'
import { DetailsTypes, ResponseData } from '../../../lib/db-types'
import { DataProps } from '../../../lib/db-types'
import { FormProps } from '../../../lib/types'
import { getView } from '../../../utility/getView/getView'

export type AyahResponseType = {
  id: string,
  soorah: number,
  ayah: number,
  content: string,
  arabic: string,
  transliteration: string,
  juz: number
  prev: number | null
  next: number | null
}

export type ReponseProps = {
  out?: AyahResponseType,
  data?: FormProps
} & ResponseData

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReponseProps>
) => {
  const { query, method } = req

  const soorah_id = Number(query.soorah.toString())
  const ayah_id = Number(query.ayah.toString())
  const data = getView({ s: soorah_id, a: ayah_id })

  switch (method) {
    case 'GET':
      try {
        const ayahs = await withMongo(async (db: Db) => {
          const contentCollection = db.collection<DataProps>('qurans')
          const content = await contentCollection.findOne({
            soorah_id, aya_id: ayah_id
          }).then(({ _id, soorah_id, aya_id, content }) =>
            ({ id: _id, soorah: soorah_id, ayah: aya_id, content }))

          const prev = await contentCollection.findOne({
            soorah_id, aya_id: ayah_id - 1
          }).then((data) => data?.aya_id ? data.aya_id : null)
          const next = await contentCollection.findOne({
            soorah_id, aya_id: ayah_id + 1
          }).then((data) => data?.aya_id ? data.aya_id : null)
          console.log(prev, next)
          const detailsCollection = db.collection<DetailsTypes>('details')
          const details = await detailsCollection.findOne({
            soorah_id, aya_id: ayah_id
          }).then(({ content, transliteration, juz }) => ({ arabic: content, transliteration, juz }))

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
export default handler