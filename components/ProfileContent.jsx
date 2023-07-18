import {useSession} from 'next-auth/react'
import {Avatar, Box, Divider, Heading, Skeleton, Stack, Text} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import {NewMessageForm} from '@/components/NewMessageForm'
import {BASE_URL} from '@/config/defaultValues'
import {Message} from '@/components/Message'
import {UsersList} from '@/components/UsersList'
import {FormAddVideo} from '@/components/FormAddVideo'
import {getMessagesCurrentUser} from '@/utils/getMessagesCurrentUser'

export const ProfileContent = ({users}) => {
    const session = useSession()
    const email = session?.data?.user?.email
    const name = session?.data?.user?.name
    const image = session?.data?.user?.image
    const [selectUser, setSelectUser] = useState(null)
    const [messages, setMessages] = useState(undefined)
    const [isLoading, setLoading] = useState(false)

    const onDeleteMessage = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/api/message/${id}`, {
                method: 'DELETE'
            })
            const json = await res.json()
            if (json) setLoading(false)
            if (json.id) getMessagesCurrentUser(email, setMessages)
        } catch (e) {
            setLoading(false)
            console.log(e.messages)
        }
    }

    useEffect(() => {
        let timeout
        if (email) {
            timeout = setTimeout(() => {
                getMessagesCurrentUser(email, setMessages)
            }, 1000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [session])

    //-------- Запрос к БД каждые 30 сек ----------
    /*useEffect(() => {
        const interval = setInterval(() => {
            getMessagesCurrentUser()
        }, 30000)

        return(() => {
            clearInterval(interval)
        })
    }, [])*/

    return (
        <Box display="flex" flexDir="column" gap={1}>
            <Box display="flex" gap={2}>
                {image
                    ? <Avatar src={image} name="user" loading="eager" size="lg"/>
                    : <Avatar/>
                }

                <Box>
                    <Heading size="md">{name}</Heading>
                    <Text fontSize={{base: '14px', md: '16px'}}>{email}</Text>
                </Box>
            </Box>
            <Divider my={10}/>
            <FormAddVideo userEmail={email}/>
            <Divider my={10}/>
            <UsersList users={users} onSelect={setSelectUser} selectUserId={selectUser?.id}/>
            <Divider my={10}/>
            <NewMessageForm
                authorEmail={email}
                name={name}
                selectUser={selectUser}
                onClearSelectUser={setSelectUser}
                onRefetchMessages={() => getMessagesCurrentUser(email, setMessages)}
            />
            <Divider my={5}/>
            {Array.isArray(messages) && messages.length
                ? messages.map((m) => (
                    <Message
                        key={m.id}
                        message={m}
                        onDelete={onDeleteMessage}
                        isLoading={isLoading}
                        isOwner={m.authorEmail === email}
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
