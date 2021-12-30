import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="bs">
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="author" content="Aziz" />
          <meta httpEquiv="content-language" content="bs,sr,sh,hr" />
        </Head>
        <body className="d-flex flex-column h-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
