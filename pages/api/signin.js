import prisma from '@/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })
        console.log('user: ', user)
        if (user) {
            const passwordResult = bcrypt.compareSync(req.body.password, user.password)
            if (passwordResult) {
                const {password, ...userWithoutPass} = user
                res.status(200).json(userWithoutPass)
            } else {
                res.status(401).json({error: 'Пароль не верен'})
            }
        } else {
            res.status(401).json({error: 'email не верен'})
        }
    }
}
