import { FormProps } from "./types"

export type ResponseData = { success: boolean }

export type BaseAyahProps = {
  soorah: number,
  ayah: number,
  content: string,
}

export type DataProps = {
  _id: string,
  detail_id: number,
  soorah_id: number,
  aya_id: number,
  content: string,
  translator_id: number
}

export interface DataPropsLatinized extends BaseAyahProps {
  _id: string,
  id: string,
  detail_id: number,
  content_latinized: string,
  translator_id: number
}

export type DetailsTypes = {
  _id: string,
  soorah_id: number,
  aya_id: number,
  content: string,
  translator_id: number
  arabic: string
  transliteration: string
  juz: number
}
