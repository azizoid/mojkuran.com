export type PaginationProps = {
  currentPage: number
  perPage: number
  total: number
}

export const initialPaginate: PaginationProps = {
  total: 0,
  perPage: 30,
  currentPage: 1,
}
