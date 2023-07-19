import Link from 'next/link'
import {Avatar} from '@chakra-ui/react'

export const Logo = ({imgUrl = '', status}) => {
    return (
        <>
            {status === 'unauthenticated'
                ? <Avatar style={{visibility: 'hidden'}}/>
                : status === 'authenticated' && imgUrl
                    ? <Link href="/">
                        <Avatar src={imgUrl} name="logo"/>
                    </Link>
                    : status === 'loading' && <Link href="/">
                        <Avatar style={{visibility: 'hidden'}}/>
                    </Link>
            }
        </>
    )
}
