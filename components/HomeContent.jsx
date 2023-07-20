import {Box, Divider, Heading, Text} from '@chakra-ui/react'
import {useSession} from 'next-auth/react'
import {VideosList} from '@/components/VideosList'
import {useEffect, useState} from 'react'
import {getVideosList} from '@/utils/getVideosList'
import {deleteVideoItem} from '@/utils/deleteVideoItem'
import {Slider} from '@/components/Slider'

export const HomeContent = () => {
    const session = useSession()
    const [videos, setVideos] = useState([])
    const [isLoading, setLoading] = useState(false)
    const isAuth = !!session.data

    const onDeleteHandle = async (id) => {
        const res = await deleteVideoItem(id)
        if (res.id) {
            getVideosList(session.data.user.email)
                .then((data) => setVideos(data))
                .catch((e) => console.error(e.message))
        }
    }

    useEffect(() => {
        let timer
        if (session?.data?.user) {
            setLoading(true)
            timer = setTimeout(() => {
                getVideosList(session.data.user.email)
                    .then((data) => {
                        setVideos(data)
                        setLoading(false)
                    })
                    .catch((e) => {
                        setLoading(false)
                        console.error(e.message)
                    })
            }, 2000)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [session])

    return (
        <Box>
            <Slider/>
            <Divider my={10}/>
            <Heading size="xl">YouTube video</Heading>
            <Text>
                {session.data
                    ? 'Add url into Profile'
                    : 'You need authorized'
                }
            </Text>
            <VideosList isAuth={isAuth} videos={videos} onDelete={onDeleteHandle} isLoading={isLoading}/>
        </Box>
    )
}
