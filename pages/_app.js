import { useState, useCallback } from "react"
import { useRouter } from "next/router"

import Script from "next/script"

import NextNprogress from "nextjs-progressbar"

import { AppContext } from "../assets/context"

import "../styles/app.scss"

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  const routerForm = useCallback(() => {
    let queryForm = { s: 0, a: "", t: 1, q: "", view: "empty" }

    // if (router.query.t)       queryForm = { ...queryForm, t: router.query.t };
    if (router.query.s) queryForm = { ...queryForm, s: router.query.s }
    if (router.query.za) queryForm = { ...queryForm, a: router.query.za }
    if (router.query.search)
      queryForm = { ...queryForm, q: router.query.search }

    return queryForm
  }, [router])

  const [form, setForm] = useState(routerForm(router))

  return (
    <AppContext.Provider value={{ form, setForm }}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-46216659-7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || []; function gtag()
            {dataLayer.push(arguments)}
            gtag('js, new Date()); gtag('config', 'UA-46216659-7');
            `}
      </Script>

      <NextNprogress />

      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
