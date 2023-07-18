import {BASE_URL} from '@/config/defaultValues'

export async function deleteVideoItem(id){
    const res = await fetch(`${BASE_URL}/api/video/${id}`, {
        method: 'DELETE'
    })
    return res.json()
}
