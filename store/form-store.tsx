import { useRouter } from "next/router"
import React, { createContext, FC, useEffect, useMemo, useState } from "react"
import { FormProps } from "../lib/types"

import { getView } from "../utility/getView/getView"

export const FormContext = createContext({} as FormProps)

type FormContextProviderProps = {
  children?: React.ReactNode
}

export const FormContextProvider: FC<FormContextProviderProps> = ({
  children,
}) => {
  const { query } = useRouter()
  const [state, setState] = useState<FormProps>()

  const getDataFromRouter = useMemo(
    () =>
      getView({
        s: Number(query?.soorah?.toString()) || 0,
        a: Number(query?.ayah?.toString()) || "",
        q: query?.search?.toString() || "",
        t: 1,
      }),
    [query?.ayah, query?.search, query?.soorah]
  )

  useEffect(() => {
    setState(getDataFromRouter)
  }, [getDataFromRouter])

  return <FormContext.Provider value={state}>{children}</FormContext.Provider>
}
