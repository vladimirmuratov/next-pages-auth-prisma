import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <meta httpEquiv="Permissions-Policy" content="interest-cohort=()"/>
            {/*УДАЛИТЬ ПРИ PRODUCTION!!!*/}
            <meta name="robots" content="noindex,nofollow" key="robots"/>
            {/*-----------------------*/}
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
