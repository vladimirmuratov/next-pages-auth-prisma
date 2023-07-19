import {useForm} from 'react-hook-form'
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text, useToast
} from '@chakra-ui/react'
import {GoogleBtn} from '@/components/auth-buttons/GoogleBtn'
import {YandexBtn} from '@/components/auth-buttons/YandexBtn'
// import {MailRuBtn} from '@/components/auth-buttons/MailRuBtn'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {useEffect, useState} from 'react'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router'

export const FormAuth = ({signUp = false}) => {
    const toast = useToast()
    const textTitle = signUp ? 'Sign Up' : 'Sign In'
    const flag = signUp ? 'SignUp' : 'SignIn'
    const [isShowPass, setShowPass] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm()

    useEffect(() => {
        if (error) {
            toast({
                title: 'Ошибка!',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }
    }, [error])

    const onSubmit = async (data) => {
        setLoading(true)
        const payload = {
            ...data,
            flag
        }

        const res = await signIn('credentials', {...payload, redirect: false})
        if (res && res.status === 200) {
            await router.push('/profile')
            reset()
            setLoading(false)
        } else if (res.status === 401) {
            setLoading(false)
            setError(res.error)
            setTimeout(() => setError(''), 5000)
        }
    }

    const toggleShowPass = () => setShowPass((prevState) => !prevState)

    return (
        <Box width={{base: '66%', md: '50%'}} m="0 auto" mb="10">
            <Heading size="2xl" my={{base: 3, md: 10}} textAlign="center">{textTitle}</Heading>
            {/*{error && <Text color="red" textAlign="center" fontSize="20px" fontWeight="semibold">{error}</Text>}*/}
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                }}
            >
                {signUp && (
                    <FormControl>
                        <FormLabel fontWeight="semibold">Name</FormLabel>
                        <Input type="text" {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 3,
                                message: 'Min 3 symbols'
                            }
                        })} />
                        {errors.name && <FormHelperText color="red">{errors.name?.message}</FormHelperText>}
                    </FormControl>
                )}
                <FormControl>
                    <FormLabel fontWeight="semibold">Email address</FormLabel>
                    <Input type="email" {...register('email', {required: 'Email is required',})} />
                    {errors.email && <FormHelperText color="red">{errors.email?.message}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="semibold">Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={isShowPass ? 'text' : 'password'} {...register('password', {required: 'Password is required'})} />
                        {errors.password && <FormHelperText color="red">{errors.password?.message}</FormHelperText>}
                        <InputRightElement style={{cursor: 'pointer'}}>
                            {isShowPass ? <ViewOffIcon onClick={toggleShowPass}/> :
                                <ViewIcon onClick={toggleShowPass}/>}
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                {signUp && (<FormControl>
                    <FormLabel fontWeight="semibold">Image</FormLabel>
                    <Input type="text" {...register('image')} />
                </FormControl>)
                }
                <Box
                    width={{base: '100%', md: '50%'}}
                    m="0 auto"
                    display="flex"
                    justifyContent="center"
                >
                    <Button
                        width="100%"
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Sending..."
                        colorScheme="teal"
                        variant="solid"
                        spinnerPlacement="start"
                    >
                        Submit
                    </Button>
                </Box>
            </form>
            <Divider my={5}/>
            <Box display="flex" flexDir="column" gap={2} width={{base: '100%', md: '50%'}} alignItems="center"
                 m="0 auto">
                <GoogleBtn/>
                <YandexBtn/>
                {/*<MailRuBtn/>*/}
            </Box>
        </Box>
    )
}
