import { useRouter } from "next/router"
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { FormProps } from "../lib/types"

import { getView, initialStateProps } from "../utility/getView/getView"

export type FormContextProps = {
  form: FormProps
  // setForm: Dispatch<SetStateAction<FormProps>>
  setForm: (value: Partial<FormProps>) => void
}

export const FormContext = createContext({} as FormContextProps)

export const FormContextProvider: FC = ({ children }) => {
  const router = useRouter()
  const [state, setState] = useState(initialStateProps)

  useEffect(() => {
    const form = getView({
      s: Number(router.query?.s?.toString()) || 0,
      a: Number(router.query?.za?.toString()) || "",
      q: router.query?.search?.toString() || "",
      view: "empty",
    })

    setState(form)
  }, [router.query?.s, router.query?.search, router.query?.za])

  const setForm = (form: FormProps) => {
    setState(getView(form))
  }

  return (
    <FormContext.Provider value={{ form: state, setForm }}>
      {children}
    </FormContext.Provider>
  )
}
