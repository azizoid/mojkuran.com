import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="bs">
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="author" content="Aziz" />
          <meta httpEquiv="content-language" content="bs,sr,sh,hr" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
          />
        </Head>
        <body className="bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
