import {Box, Heading} from '@chakra-ui/react'
import {useSession} from 'next-auth/react'

export const HomeContent = () => {
    // const session = useSession()
    // console.log('session', session)
    return(
        <Box>
            <Heading size="2xl">Home page</Heading>
        </Box>
    )
}
