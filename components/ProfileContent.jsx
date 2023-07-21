import {useSession} from 'next-auth/react'
import {Avatar, Box, Divider, Heading, Text} from '@chakra-ui/react'
import {FormAddVideo} from '@/components/FormAddVideo'

export const ProfileContent = () => {
    const session = useSession()
    const email = session?.data?.user?.email
    const name = session?.data?.user?.name
    const image = session?.data?.user?.image

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
        </Box>
    )
}
