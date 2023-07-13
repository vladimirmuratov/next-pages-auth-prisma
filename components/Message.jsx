import {Box, Card, CardBody, Text} from '@chakra-ui/react'

export const Message = ({message}) => (
    <Card>
        <CardBody>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Text as="span" p={1} bgColor="gray.100" fontSize="xs" borderRadius="sm">{new Date(message.createdAt).toLocaleString()}</Text>
                <Text as="span" p={1} bgColor="gray.100" fontSize="xs" borderRadius="sm">{message.authorEmail}</Text>
            </Box>
            <Text>{message.message}</Text>
        </CardBody>
    </Card>
)
