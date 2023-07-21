import {Box, Divider} from '@chakra-ui/react'
import {getMessagesCurrentUser} from '@/utils/getMessagesCurrentUser'
import {NewMessageForm} from '@/components/NewMessageForm'
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import {UsersList} from '@/components/UsersList'
import {BASE_URL} from '@/config/defaultValues'
import {MessagesList} from '@/components/MessagesList'

export const MessageContent = ({users}) => {
    const session = useSession()
    const email = session?.data?.user?.email
    const name = session?.data?.user?.name
    const [selectUser, setSelectUser] = useState(null)
    const [messages, setMessages] = useState(undefined)
    const [isLoading, setLoading] = useState(false)

    //-------- Запрос к БД каждые 30 сек ----------
    /*useEffect(() => {
        const interval = setInterval(() => {
            getMessagesCurrentUser()
        }, 30000)

        return(() => {
            clearInterval(interval)
        })
    }, [])*/

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

    return (
        <Box display="flex" flexDir="column" gap={1}>
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
            <MessagesList
                messages={messages}
                onDeleteMessage={onDeleteMessage}
                isLoading={isLoading}
                email={email}
            />
        </Box>
    )
}
