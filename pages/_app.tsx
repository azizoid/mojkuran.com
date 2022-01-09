import React from "react"
import type { AppProps } from "next/app"
import Script from "next/script"

import NextNprogress from "nextjs-progressbar"

import { FormContextProvider } from "../store/form-store"

import "../styles/app.scss"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <FormContextProvider>
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
  </FormContextProvider>
)

export default MyApp
