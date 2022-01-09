export type FormSoorahProp = number
export type FormAyahProp = number | ""
export type FormQueryProp = string | undefined
export type FormViewProp = "empty" | "soorah" | "ayah" | "search"

export type FormProps = {
  s: FormSoorahProp
  a: FormAyahProp
  q: FormQueryProp
  // t?: 1
  view: FormViewProp
}

export type DisplayData = {
  id: string
  soorah: number;
  ayah: number;
  content: string
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
