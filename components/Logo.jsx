import Link from 'next/link'
import {Avatar} from '@chakra-ui/react'

export const Logo = ({imgUrl = ''}) => {
    return (
        <Link href="/">
            {imgUrl
                ? <Avatar src={imgUrl} name="logo"/>
                : <Avatar style={{visibility: 'hidden'}}/>
            }
        </Link>
    )
}
