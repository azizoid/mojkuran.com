import React, { ReactElement, ReactNode, useEffect } from "react"
import type { AppProps } from "next/app"
import { NextPage } from "next"
import TagManager from "react-gtm-module"

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

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-NVN95DH" })
  }, [])
  return getLayout(
    <FormContextProvider>
      <NextNprogress />

      <Component {...pageProps} />
    </FormContextProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default MyApp
