import React, { useContext, useEffect } from "react"
import type { AppProps } from "next/app"
import Script from "next/script"
import { useRouter } from "next/router"

import { Provider } from "react-redux"
import { store } from "../store/store"

import NextNprogress from "nextjs-progressbar"

import { FormContextProvider, FormContext } from "../store/form-store"

import "../styles/app.scss"

import { getView } from "../utils/getView/getView"

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  const context = useContext(FormContext)

  useEffect(() => {
    console.log("router", router.query)

    const form = getView({
      // ...router.query,
      s: parseInt(router.query?.s.toString()) || 0,
      a: parseInt(router.query?.za.toString()) || "",
      q: router.query?.q?.toString() || "",
      view: "empty",
    })

    console.log("app, form", form)

    context.setForm(form)
  }, [router, context])

  return (
    <Provider store={store}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-46216659-7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || []; 
        function gtag() {window.dataLayer.push(arguments);}
        gtag('js', new Date()); 
        
        gtag('config', 'UA-46216659-7');
        `}
      </Script>

      <NextNprogress />

      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
