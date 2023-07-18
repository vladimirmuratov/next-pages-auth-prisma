import {BASE_URL} from '@/config/defaultValues'

export async function getMessagesCurrentUser(email, fn) {
    const res = await fetch(`${BASE_URL}/api/message?email=${email}`)
    const json = await res.json()
    fn(json)
}
