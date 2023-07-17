import {Button, FormControl, FormHelperText, Input} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import {useState} from 'react'
import {BASE_URL} from '@/config/defaultValues'

export const FormAddVideo = ({userEmail}) => {
    const [url, setUrl] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (url) {
            setLoading(true)
            const payload = {
                userEmail,
                url: url.trim()
            }
            const res = await fetch(`${BASE_URL}/api/video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const json = await res.json()
            if (res.status === 201) {
                setLoading(false)
                setUrl('')
            } else {
                setLoading(false)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex'}}>
            <FormControl w={{base: '100%', md: '50%'}}>
                <Input
                    type="text"
                    placeholder="Add youtube Id video"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <FormHelperText>Example: https://youtu.be/cJpVlFMHz1E?list=RDcJpVlFMHz1E</FormHelperText>
                <FormHelperText>You need input: cJpVlFMHz1E</FormHelperText>
            </FormControl>
            <Button
                leftIcon={<AddIcon/>}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                isDisabled={!url}
                loadingText="Sending..."
            >ADD</Button>
        </form>
    )
}
