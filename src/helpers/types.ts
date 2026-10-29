import type { FormProps } from '@/utility/getView'

export type DisplayData = {
  id: number
  soorah: number
  ayah: number
  content: string
  content_latinized?: string
  matches?: string[]
}

export type ResponseProps = {
  out: DisplayData[]
  data?: FormProps
  paginate?: {
    total: number
    perPage: number
    currentPage: number
  }
}

export type ResponseErrorType = {
  out: null
  error: string
}
