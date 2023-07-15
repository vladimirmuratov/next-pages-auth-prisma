import {Button, FormControl, FormErrorMessage, FormLabel, Textarea} from '@chakra-ui/react'
import {useState} from 'react'
import {BASE_URL} from '@/config/defaultValues'

export const NewMessageForm = ({email, onRefetchMessages}) => {
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setLoading] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log(message)
        if (!message) {
            setIsError(true)
        } else {
            setLoading(true)
            const res = await fetch(`${BASE_URL}/api/message?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message}),

            })

            const json = await res.json()
            // console.log('res New Message', json)
            if (json) {
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
                isDisabled={!message}
            >Submit</Button>
        </form>
    )
}
