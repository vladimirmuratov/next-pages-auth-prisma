import prisma from '@/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // console.log(req.body)
        // console.log(req.query)
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
        // console.log('email query', email)

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

        // console.log('res.mess', messages)

        res.status(200).json(messages)
    }
}
