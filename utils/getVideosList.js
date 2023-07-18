import {BASE_URL} from '@/config/defaultValues'

export async function getVideosList(email) {
    const res = await fetch(`${BASE_URL}/api/video?userEmail=${email}`)
    return await res.json()
}
