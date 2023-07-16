import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from 'next-auth/providers/yandex'
// import MailRuProvider from 'next-auth/providers/mailru'
import Credentials from 'next-auth/providers/credentials'
import {BASE_URL} from '@/config/defaultValues'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET
        }),
        /*MailRuProvider({
            clientId: process.env.MAILRU_CLIENT_ID,
            clientSecret: process.env.MAILRU_CLIENT_SECRET
        }),*/
        Credentials({
            credentials: {
                email: {label: 'email', type: 'email', required: true},
                password: {label: 'password', type: 'password', required: true},
                image: {label: 'image', type: 'text'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null

                const uri = credentials.flag === 'SignUp' ? 'signup' : 'signin'

                const res = await fetch(`${BASE_URL}/api/${uri}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })

                const json = await res.json()

                if (json.error) {
                    throw new Error(json.error)
                } else {
                    return json
                }

                // return null
            }
        })
    ],
    pages: {
        signIn: '/signin'
    }
}
