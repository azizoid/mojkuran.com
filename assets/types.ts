export type AyahProps = {
  id: number;
  s: FormSoorahProp;
  a: FormAyahProp;
  c: string;
  t: 1
}

export type FormSoorahProp = number
export type FormAyahProp = number | ""
export type FormQueryProp = string | undefined

export type RouterForm = {
  s?: FormSoorahProp;
  za?: FormAyahProp;
  q?: FormQueryProp;
}

export enum PageStates {
  INIT = "Initialization",
  EMPTY = "Page is empty",
  LOADING = "Loading...",

  SOORAH = "Soorah View",
  AYAH = "Ayah View",
  SEARCH = "Search View",

  NOT_FOUND = 'Not Found'
}

export type PaginationProps = {
  currentPage: number,
  from: number,
  lastPage: number,
  perPage: number,
  to: number,
  total: number,
}

