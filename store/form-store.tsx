import { useRouter } from "next/router"
import React, { createContext, FC, useEffect, useState } from "react"
import { FormProps } from "../lib/types"

import { getView, initialStateProps } from "../utility/getView/getView"

export type FormContextProps = {
  form: FormProps
  setForm: (value: Partial<FormProps>) => void
}

export const FormContext = createContext({} as FormContextProps)

export const FormContextProvider: FC = ({ children }) => {
  const { query } = useRouter()
  const [state, setState] = useState(initialStateProps)

  useEffect(() => {
    const form = getView({
      s: Number(query?.soorah?.toString()) || 0,
      a: Number(query?.ayah?.toString()) || "",
      q: query?.search?.toString() || "",
      view: "empty",
    })

    setState(form)
  }, [query?.ayah, query?.search, query?.soorah])

  const setForm = (form: Partial<FormProps>) => {
    setState(getView(form))
  }

  return (
    <FormContext.Provider value={{ form: state, setForm }}>
      {children}
    </FormContext.Provider>
  )
}
