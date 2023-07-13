import {Button, useToast} from '@chakra-ui/react'

export const Toast = ({error}) => {
    const toast = useToast()
    return (
        toast({
            title: 'Ошибка!',
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    )
}
