import {Button} from '@chakra-ui/react'
import {AiOutlineGoogle} from 'react-icons/ai'
import {signIn} from 'next-auth/react'
import {useSearchParams} from 'next/navigation'

export const GoogleBtn = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    return (
        <Button
            width="100%"
            colorScheme="blue"
            leftIcon={<AiOutlineGoogle/>}
            onClick={() => signIn('google', {callbackUrl})}
        >
            Sign in with Google
        </Button>
    )
}
