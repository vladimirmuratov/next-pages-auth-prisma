import {
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    List,
    ListItem
} from '@chakra-ui/react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export const MobileMenu = ({session = null, onClose, isOpen, navLinks = [], authLinks = [], onSignOut=null}) => {
    const uri = usePathname()

    const activeLink = (path) => {
        return path === uri ? 'var(--blue)' : ''
    }

    return (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                    <List spacing={1}>
                        {navLinks.map((link) => {
                            if (!session && link.label !== 'Profile') {
                                return (
                                    <ListItem key={link.id} color={activeLink(link.path)}>
                                        <Link href={link.path} onClick={onClose}>{link.label}</Link>
                                    </ListItem>
                                )
                            } else if (session) {
                                return (
                                    <ListItem key={link.id} color={activeLink(link.path)}>
                                        <Link href={link.path} onClick={onClose}>{link.label}</Link>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                    <Divider my={2}/>
                    <List spacing={1}>
                        {authLinks.map((link) => {
                            if (session && link.label === 'Sign Out') {
                                return (
                                    <ListItem key={link.id} color={activeLink(link.path)}>
                                        <Link href={link.path} onClick={() => {
                                            onSignOut({
                                                callbackUrl: '/'
                                            })
                                            onClose()
                                        }}>{link.label}</Link>
                                    </ListItem>
                                )
                            } else if (!session && link.label !== 'Sign Out') {
                                return (
                                    <ListItem key={link.id} color={activeLink(link.path)}>
                                        <Link href={link.path} onClick={onClose}>{link.label}</Link>
                                    </ListItem>
                                )
                            }
                        })}
                    </List>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}
