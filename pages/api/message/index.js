import prisma from '@/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const authorEmail = req.body.authorEmail
        const message = req.body.message
        const to = req.body.to

        const newMessage = await prisma.message.create({
            data: {
                message: message,
                authorEmail: authorEmail,
                to: to
            }
        })

        res.status(201).json({newMessage})
    }

    if (req.method === 'GET') {
        const email = req.query.email

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {authorEmail: email},
                    {to: email}
                ]
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        res.status(200).json(messages)
    }
}
