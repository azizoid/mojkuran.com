import { RouterForm, FormAyahProp } from "../../assets/types"

export type GetViewProps = Omit<RouterForm, 'za'> & {
  a?: FormAyahProp,
  view: string
}

export const getView = (form: GetViewProps): GetViewProps => {

  if (form?.s > 0 && form?.s < 115) {
    form.view = "soorah"

    if (form?.a > 0 && form?.a < 287) {
      form.view = "ayah"
    }
  } else if (form?.q?.length > 2) {
    form.view = "search"
  } else form.view = "empty"

  return form
}