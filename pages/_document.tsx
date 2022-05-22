import { Html, Head, Main, NextScript } from "next/document"

// eslint-disable-next-line import/no-default-export
export default function MyDocument() {
  return (
    <Html lang="bs">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="author" content="Aziz" />
        <meta httpEquiv="content-language" content="bs,sr,sh,hr" />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
