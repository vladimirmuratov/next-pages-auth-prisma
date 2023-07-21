import {Message} from '@/components/Message'
import {Heading, Skeleton, Stack} from '@chakra-ui/react'

export const MessagesList = ({messages, onDeleteMessage, isLoading, email}) => {
    return(
        <>
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
        </>
    )
}
