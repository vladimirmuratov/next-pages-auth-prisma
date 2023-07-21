import {Box} from '@chakra-ui/react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export const Navigation = ({links = [], session = null, isAuthLinks = false, onSignOut=null}) => {
    const uri = usePathname()
    return (
        <Box as="nav" display={{base: 'none', md: 'flex'}} gap={2} fontSize={20}>
            {links.map((link) => {
                if (isAuthLinks && session && link.label === 'Sign Out') {
                    return (
                        <Link key={link.id} href={link.path} onClick={() => onSignOut({
                            callbackUrl: '/'
                        })}>{link.label}</Link>
                    )
                } else if (isAuthLinks && !session && link.label !== 'Sign Out') {
                    return (
                        <Link
                            key={link.id}
                            href={link.path}
                            style={{
                                padding: '10px',
                                backgroundColor: uri === link.path ? 'var(--dark-blue)' : 'inherit'
                            }}
                        >
                            {link.label}
                        </Link>
                    )
                } else if (!isAuthLinks && !session && link.label !== 'Profile' && link.label !== 'Messages') {
                    return (
                        <Link
                            key={link.id}
                            href={link.path}
                            style={{
                                padding: '10px',
                                backgroundColor: uri === link.path ? 'var(--dark-blue)' : 'inherit'
                            }}
                        >
                            {link.label}
                        </Link>
                    )
                } else if (!isAuthLinks && session) {
                    return (
                        <Link
                            key={link.id}
                            href={link.path}
                            style={{
                                padding: '10px',
                                backgroundColor: uri === link.path ? 'var(--dark-blue)' : 'inherit'
                            }}
                        >
                            {link.label}
                        </Link>
                    )
                }
            })}
        </Box>
    )
}
