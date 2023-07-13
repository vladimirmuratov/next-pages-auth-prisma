import '@/styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from '@/theme'
import {Layout} from '@/components/Layout'
import {SessionProvider} from 'next-auth/react'

export default function App({Component, pageProps: { session, ...pageProps }}) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </SessionProvider>
    )
}
