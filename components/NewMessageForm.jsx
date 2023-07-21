import {Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Textarea} from '@chakra-ui/react'
import {useState} from 'react'
import {BASE_URL} from '@/config/defaultValues'

export const NewMessageForm = ({authorEmail, name, selectUser, onClearSelectUser, onRefetchMessages}) => {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setLoading] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!message) {
            setIsError(true)
        } else if (message && selectUser.email) {
            setLoading(true)
            const payload = {
                authorEmail: authorEmail,
                to: selectUser.email,
                message: message
            }
            const res = await fetch(`${BASE_URL}/api/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),

            })

            const json = await res.json()

            if (json) {
                onClearSelectUser(null)
                setMessage('')
                setLoading(false)
                onRefetchMessages()
            } else {
                setLoading(false)
            }
        }
    }
    const handleChange = (event) => {
        setIsError(false)
        setMessage(event.target.value)
    }
    return (
        <Box>
            <Box mb={10} display="flex" flexDir="column" gap={1}>
                <Heading size="md">From: <Box as="span" px={2}>{name}</Box></Heading>
                <Heading size="md">To: <Box as="span" px={2}>{selectUser?.name}</Box></Heading>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={isError}>
                    <FormLabel>Your message</FormLabel>
                    <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={handleChange}
                    />
                    {isError && <FormErrorMessage>Message should not be empty</FormErrorMessage>}
                </FormControl>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    colorScheme="facebook"
                    mt={5}
                    loadingText="Sending..."
                    isDisabled={!message || !selectUser?.email}
                >Submit</Button>
            </form>
        </Box>
    )
}
