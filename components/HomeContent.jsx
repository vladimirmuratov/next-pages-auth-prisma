import {Box, Heading, Text} from '@chakra-ui/react'
import {useSession} from 'next-auth/react'
import YouTube from 'react-youtube'

export const HomeContent = () => {
    const session = useSession()
    // console.log('session', session)
    return (
        <>
            <Box>
                <Heading size="xl">Play list</Heading>
                <Text>
                    {session.data
                        ? 'Add url into Profile'
                        : 'You need authorized'
                    }
                </Text>
                <YouTube videoId="cJpVlFMHz1E"/>
            </Box>
        </>
    )
}
