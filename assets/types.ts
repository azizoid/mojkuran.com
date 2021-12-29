export type AyahProps = {
  id: number;
  s: number;
  a: number;
  c: string;
  t: 1
}

export type RouterForm = {
  s?: number;
  za?: number | "";
  q?: string;
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