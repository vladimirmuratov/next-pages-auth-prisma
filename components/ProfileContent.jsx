import {useSession} from 'next-auth/react'
import {Box, Card, CardBody, Divider, Heading, Text} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import {NewMessageForm} from '@/components/NewMessageForm'
import {BASE_URL} from '@/config/defaultValues'
import {Message} from '@/components/Message'

export const ProfileContent = () => {
    const session = useSession()
    // console.log('session', session)
    const [messages, setMessages] = useState([])

    const getAllMessages = async () => {
        const res = await fetch(`${BASE_URL}/api/message?email=${session?.data?.user?.email}`)
        const json = await res.json()
        // console.log('all messages', json)
        setMessages(json)
    }

    useEffect(() => {
        if (session?.data?.user?.email) {
            getAllMessages()
        }
    }, [session])
    return (
        <Box display="flex" flexDir="column" gap={1}>
            <Box display="flex">
                {session?.data?.user?.image &&
                    <img src={session?.data?.user?.image} alt="pic" width={100} height={100}/>}
                <Box>
                    <Heading size="md">{session?.data?.user?.name}</Heading>
                    <Text fontSize={{base: '14px', md: '16px'}}>{session?.data?.user?.email}</Text>
                </Box>
            </Box>
            <Divider my={10}/>
            <NewMessageForm email={session?.data?.user?.email} onRefetchMessages={getAllMessages}/>
            <Divider my={5}/>
            {messages.length
                ? messages.map((m) => (
                    <Message key={m.id} message={m}/>
                ))
                : <Heading>Not found messages</Heading>
            }
        </Box>
    )
}
