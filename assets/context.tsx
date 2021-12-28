import React, {
  FC,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react"

import { useRouter } from "next/router"

export type FormProps = {
  s?: number
  a?: number | string
  t: 1
  q?: string
  view: string
}

export const defaultFormProps: FormProps = {
  s: 0,
  a: "",
  q: "",
  view: "empty",
  t: 1,
}

const AppContext = createContext<FormProps>(defaultFormProps)

export const AppWrapper: FC<{
  value: { state: FormProps; setState: Function }
}> = ({ value, children }) => {
  const router = useRouter()
  const [state, setState] = useState<FormProps>(value.state)

  useEffect(() => {
    if (router.query.search) {
      setState((prev) => ({
        ...prev,
        s: 0,
        a: "",
        q: router.query.search.toString(),
      }))
    } else {
      if (router.query.s) {
        setState((prev) => ({
          ...prev,
          s: 0,
        }))
      }
      if (router.query?.za) {
        setState((prev) => ({
          ...prev,
          a: "",
        }))
      }
    }
  }, [router.query])

  const returnValue = useMemo(() => ({ state, setState }), [state])

  return (
    <AppContext.Provider value={returnValue}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
