import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    fonts: {
        heading: `'Roboto', sans-serif`,
        body: `'Montserrat', sans-serif`,
    },
})
