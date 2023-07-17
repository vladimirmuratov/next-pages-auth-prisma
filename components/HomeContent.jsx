import {Box, Heading, Text} from '@chakra-ui/react'
import {useSession} from 'next-auth/react'
import {VideosList} from '@/components/VideosList'

export const HomeContent = ({videos = []}) => {
    const session = useSession()

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
                <VideosList videos={videos}/>
            </Box>
        </>
    )
}
