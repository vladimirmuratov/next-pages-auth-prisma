import {Box, Card, CardBody, IconButton, Text} from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'

export const Message = ({message, onDelete, isLoading, isOwner}) => (
    <Card
        position="relative"
        bgColor={isOwner ? 'green.100': 'gray.100'}
        w={{base: '100%', md: '50%'}}
        transform={isOwner && {base: 'none', md: 'translateX(100%)'}}
        my={1}
    >
        {isOwner && <IconButton
            isDisabled={isLoading}
            onClick={() => onDelete(message.id)}
            aria-label="delete"
            icon={<CloseIcon/>}
            position="absolute"
            top={0}
            right={0}
            fontSize="10px"
            bgColor="transparent"
            color="red"
        />}
        <CardBody>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Text as="span" p={1} bgColor="gray.100" fontSize="xs"
                      borderRadius="sm">{new Date(message.createdAt).toLocaleString()}</Text>
                <Text as="span" p={1} bgColor="gray.100" fontSize="xs" borderRadius="sm">{message.authorEmail}</Text>
            </Box>
            <Text>{message.message}</Text>
        </CardBody>
    </Card>
)
