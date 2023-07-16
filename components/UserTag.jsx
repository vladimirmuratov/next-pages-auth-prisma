import {Avatar, Box, Flex, ListItem, Text} from '@chakra-ui/react'

export const UserTag = ({user, onSelect, selectUserId}) => {
    return (
        <ListItem
            onClick={() => onSelect(user)}
            border="1px solid gray"
            borderRadius="md"
            p={1}
            cursor="pointer"
            _hover={{transform: 'translateY(-5px)'}}
            bgColor={user.id === selectUserId ? 'gray.100': ''}
            style={{transition: 'all 0.3s'}}
        >
            <Flex>
                {user.image
                    ? <Avatar src={user.image} name={user.name} loading="eager"/>
                    : <Avatar/>
                }
                <Box ml="3">
                    <Text fontWeight="bold">{user.name}</Text>
                    <Text fontSize="sm">{user.email}</Text>
                </Box>
            </Flex>
        </ListItem>
    )
}
