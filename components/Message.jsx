import {Box, Card, CardBody, IconButton, Text} from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'

export const Message = ({message, onDelete, isLoading}) => (
    <Card position="relative">
        <IconButton
            isDisabled={isLoading}
            onClick={() => onDelete(message.id)}
            aria-label="delete"
            icon={<CloseIcon/>}
            position="absolute"
            top={1}
            right={1}
            fontSize="10px"
            bgColor="inherit"
            color="red"
        />
        <CardBody>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Text as="span" p={1} bgColor="gray.100" fontSize="xs" borderRadius="sm">{new Date(message.createdAt).toLocaleString()}</Text>
                <Text as="span" p={1} bgColor="gray.100" fontSize="xs" borderRadius="sm">{message.authorEmail}</Text>
            </Box>
            <Text>{message.message}</Text>
        </CardBody>
    </Card>
)
