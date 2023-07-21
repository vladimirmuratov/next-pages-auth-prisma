import {Html, Head, Main, NextScript} from 'next/document'
import {ColorModeScript} from '@chakra-ui/react'
import {theme} from '@/theme'

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
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
