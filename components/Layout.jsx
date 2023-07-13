import {Box} from '@chakra-ui/react'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'

export const Layout = ({children}) => {
    return (
        <Box as="main" minH="100vh" display="flex" flexDir="column">
            <Header/>
            <Box flexGrow={1}>
                {children}
            </Box>
            <Footer/>
        </Box>
    )
}
