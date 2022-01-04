import { useRouter } from "next/router"
import React, { createContext, FC, useEffect, useState } from "react"
import { FormAyahProp, FormQueryProp, FormSoorahProp } from "../assets/types"
import { getView } from "../utility/getView/getView"

export type FormProps = {
  s?: FormSoorahProp
  a?: FormAyahProp
  t?: 1
  q?: FormQueryProp
  view: string
}

export const initialStateProps: FormProps = {
  s: 0,
  a: "",
  q: "",
  view: "empty",
  t: 1,
}

export const FormContext = createContext<{
  form: FormProps
  setForm: React.Dispatch<React.SetStateAction<FormProps>>
}>({
  form: initialStateProps,
  setForm: () => {},
})

export const FormContextProvider: FC = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState<FormProps>(initialStateProps)

  useEffect(() => {
    const form = getView({
      s: Number(router.query?.s?.toString()) || 0,
      a: Number(router.query?.za?.toString()) || "",
      q: router.query?.search?.toString() || "",
      view: "empty",
    })
    setState(form)
  }, [router.query?.s, router.query?.search, router.query?.za])

  return (
    <FormContext.Provider value={{ form: state, setForm: setState }}>
      {children}
    </FormContext.Provider>
  )
}
