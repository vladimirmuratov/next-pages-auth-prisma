import bcrypt from 'bcryptjs'
import prisma from '@/prisma'

export async function signUp(req, res) {
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
