import React, { createContext, FC, useState } from "react"

export type FormProps = {
  s?: number
  a?: number | ""
  t?: 1
  q?: string
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
  const [state, setState] = useState<FormProps>(initialStateProps)

  return (
    <FormContext.Provider value={{ form: state, setForm: setState }}>
      {children}
    </FormContext.Provider>
  )
}
