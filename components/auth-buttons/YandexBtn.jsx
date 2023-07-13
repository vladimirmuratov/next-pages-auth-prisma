import {Button} from '@chakra-ui/react'
import {LiaYandex} from 'react-icons/lia'
import {signIn} from 'next-auth/react'
import {useSearchParams} from 'next/navigation'

export const YandexBtn = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    return (
        <Button
            width="100%"
            colorScheme="red"
            leftIcon={<LiaYandex/>}
            onClick={() => signIn('yandex', {callbackUrl})}
        >
            Sign in with Yandex
        </Button>
    )
}
