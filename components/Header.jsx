import {Box, Button, IconButton, useColorMode, useDisclosure} from '@chakra-ui/react'
import {Logo} from '@/components/Logo'
import {Navigation} from '@/components/Navigation'
import {navLinks} from '@/config/navLinks'
import {authLinks} from '@/config/authLinks'
import {HamburgerIcon} from '@chakra-ui/icons'
import {MobileMenu} from '@/components/MobileMenu'
import {signOut, useSession} from 'next-auth/react'
import {SunIcon, MoonIcon} from '@chakra-ui/icons'

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
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
            position="sticky"
            top={0}
            zIndex={10}
        >
            <Logo imgUrl={session?.data?.user?.image} status={session.status}/>
            <Navigation links={navLinks} session={session?.data}/>

            <IconButton
                position="absolute"
                right={{base: "20%", md: session.data ? "20%" : "30%"}}
                bgColor="transparent"
                _hover={{bgColor: "transparent"}}
                aria-label="theme-btn"
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
            />

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
