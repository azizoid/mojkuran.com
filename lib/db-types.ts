import { FormProps } from "./types"


export type ResponseData = { success: boolean }

export type DataProps = {
  _id: string,
  detail_id: number,
  soorah_id: number,
  aya_id: number,
  content: string,
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

export type Ayah = {
  soorah: number
  ayah: number
  content: string
  translator: number
  arabic: string
  transliteration: string
  juz: number
  prev: string | null
  next: string | null
  data: Required<FormProps>
}