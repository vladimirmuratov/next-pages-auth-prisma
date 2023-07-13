import prisma from '@/prisma'
import bcrypt from 'bcryptjs'

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
            const salt = bcrypt.genSaltSync(10)
            const pass = req.body.password

            const user = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(pass, salt),
                    image: req.body?.image
                },
            })
            const {password, ...userWithoutPass} = user
            res.status(200).json({...userWithoutPass})
        }
    }
}
