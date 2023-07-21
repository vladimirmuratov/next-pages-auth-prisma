import {Box, Card, CardBody, CloseButton, Text} from '@chakra-ui/react'

export const Message = ({message, onDelete, isLoading, isOwner}) => (
    <Card
        position="relative"
        bgColor={isOwner ? 'green.100' : 'gray.100'}
        w={{base: '100%', md: '50%'}}
        transform={isOwner && {base: 'none', md: 'translateX(100%)'}}
        my={1}
    >
        {isOwner && (
            <CloseButton
                isDisabled={isLoading}
                onClick={() => onDelete(message.id)}
                position="absolute"
                top={0}
                right={0}
                color="red"
            />
        )}
        <CardBody>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Text
                    as="span" p={1}
                    bgColor="gray.50" fontSize="xs"
                    color="gray.700"
                    borderRadius="sm"
                >
                    {new Date(message.createdAt)
                        .toLocaleString('ru', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                </Text>
                <Text as="span" p={1} bgColor="gray.50" color="gray.700" fontSize="xs" borderRadius="sm">{message.authorEmail}</Text>
            </Box>
            <Text color="gray.700">{message.message}</Text>
        </CardBody>
    </Card>
)
