import {Box, IconButton, useDisclosure} from '@chakra-ui/react'
import {Logo} from '@/components/Logo'
import {Navigation} from '@/components/Navigation'
import {navLinks} from '@/config/navLinks'
import {authLinks} from '@/config/authLinks'
import {HamburgerIcon} from '@chakra-ui/icons'
import {MobileMenu} from '@/components/MobileMenu'
import { useSession, signIn, signOut } from "next-auth/react"

export const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const session = useSession()

    return(
        <Box
            as="header"
            style={{backgroundColor: "var(--blue)"}}
            px={2}
            py={{base: 2, md: 0}}
            color="white"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Logo imgUrl={session?.data?.user?.image}/>
            <Navigation links={navLinks} session={session?.data}/>
            <Navigation links={authLinks} session={session?.data} isAuthLinks={true} onSignOut={signOut}/>
            <IconButton
                aria-label="Menu"
                icon={<HamburgerIcon fontSize={20}/>}
                display={{base: 'block', md: 'none'}}
                bgColor="inherit"
                color="white"
                onClick={onOpen}
            />
            <MobileMenu
                session={session?.data}
                isOpen={isOpen}
                onClose={onClose}
                navLinks={navLinks}
                authLinks={authLinks}
                onSignOut={signOut}
            />
        </Box>
    )
}
