import {useSession} from 'next-auth/react'
import {Avatar, Box, Divider, Heading, Skeleton, Stack, Text} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import {NewMessageForm} from '@/components/NewMessageForm'
import {BASE_URL} from '@/config/defaultValues'
import {Message} from '@/components/Message'
import {UsersList} from '@/components/UsersList'

export const ProfileContent = ({users}) => {
    const session = useSession()
    const [selectUser, setSelectUser] = useState(null)
    // console.log('selectUser', selectUser)
    const [messages, setMessages] = useState(undefined)
    const [isLoading, setLoading] = useState(false)

    const getAllMessages = async () => {
        const res = await fetch(`${BASE_URL}/api/message?email=${session?.data?.user?.email}`)
        const json = await res.json()
        setMessages(json)
    }

    const onDeleteMessage = async (id) => {
        // console.log(id)
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/api/message/${id}`, {
                method: 'DELETE'
            })
            const json = await res.json()
            // console.log('json', json)
            if (json) setLoading(false)
            if (json.id) getAllMessages()
        } catch (e) {
            setLoading(false)
            console.log(e.messages)
        }
    }

    useEffect(() => {
        let timeout
        if (session?.data?.user?.email) {
            timeout = setTimeout(() => {
                getAllMessages()
            }, 1000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [session])

    //-------- Запрос к БД каждые 30 сек ----------
    /*useEffect(() => {
        const interval = setInterval(() => {
            getAllMessages()
        }, 30000)

        return(() => {
            clearInterval(interval)
        })
    }, [])*/

    return (
        <Box display="flex" flexDir="column" gap={1}>
            <Box display="flex" gap={2}>
                {session?.data?.user?.image
                    // <img src={session?.data?.user?.image} alt="pic" width={100} height={100}/>
                    ? <Avatar src={session?.data?.user?.image} name="user" loading="eager" size="lg"/>
                    : <Avatar/>
                }

                <Box>
                    <Heading size="md">{session?.data?.user?.name}</Heading>
                    <Text fontSize={{base: '14px', md: '16px'}}>{session?.data?.user?.email}</Text>
                </Box>
            </Box>
            <Divider my={10}/>
            <UsersList users={users} onSelect={setSelectUser} selectUserId={selectUser?.id}/>
            <Divider my={10}/>
            <NewMessageForm
                authorEmail={session?.data?.user?.email}
                name={session?.data?.user?.name}
                selectUser={selectUser}
                onClearSelectUser={setSelectUser}
                onRefetchMessages={getAllMessages}
            />
            <Divider my={5}/>
            {Array.isArray(messages) && messages.length
                ? messages.map((m) => (
                    <Message
                        key={m.id}
                        message={m}
                        onDelete={onDeleteMessage}
                        isLoading={isLoading}
                        isOwner={m.authorEmail === session?.data?.user?.email}
                    />
                ))
                : !messages
                    ? (<Stack>
                        <Skeleton height="20px"/>
                        <Skeleton height="20px"/>
                        <Skeleton height="20px"/>
                    </Stack>)
                    : <></>
            }
            {Array.isArray(messages) && !messages.length && <Heading>Not found messages</Heading>}
        </Box>
    )
}
