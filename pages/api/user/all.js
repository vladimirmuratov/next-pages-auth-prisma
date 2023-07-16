import prisma from '@/prisma'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        })

        if (users) {
            res.status(200).json(users)
        } else {
            res.status(404).json({message: 'Users not found'})
        }
    }
}
