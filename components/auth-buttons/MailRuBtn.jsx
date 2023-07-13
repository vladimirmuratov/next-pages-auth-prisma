import {Button} from '@chakra-ui/react'
import {GoMail} from 'react-icons/go'
import {signIn} from 'next-auth/react'
import {useSearchParams} from 'next/navigation'

export const MailRuBtn = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    return (
        <Button
            width="100%"
            colorScheme="whatsapp"
            leftIcon={<GoMail/>}
            onClick={() => signIn('mailru', {callbackUrl})}
        >
            Sign in with Mail.Ru
        </Button>
    )
}
