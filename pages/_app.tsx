import { ReactElement, ReactNode, useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { NextPage } from "next"
import TagManager from "react-gtm-module"

import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import NextNprogress from "nextjs-progressbar"

import { FormContextProvider } from "../store/form-store"

import "../styles/global.css"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type MyAppWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: MyAppWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-NVN95DH" })
  }, [])

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <FormContextProvider>
          <NextNprogress />

          <Component {...pageProps} />
        </FormContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
