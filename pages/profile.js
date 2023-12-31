import Head from 'next/head'
import {Box} from '@chakra-ui/react'
import {ProfileContent} from '@/components/ProfileContent'

export default function Profile() {
    return (
        <>
            <Head>
                <title>App | Profile</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Box p={{base: 2, md: 4}}>
                <ProfileContent/>
            </Box>
        </>
    )
}
