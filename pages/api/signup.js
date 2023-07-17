import prisma from '@/prisma'
import {signUp} from '@/utils/signUp'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const candidate = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (candidate) {
            res.status(409).json({error: 'Такой email уже занят'})
        } else {
            await signUp(req, res)
        }
    }
}
