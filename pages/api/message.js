import prisma from '@/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        console.log(req.query)
        const email = req.query.email
        const message = req.body.message

        const newMessage = await prisma.message.create({
            data: {
                message: message,
                authorEmail: email
            }
        })

        res.status(201).json({newMessage})
    }

    if(req.method === 'GET'){
        const email = req.query.email
        // console.log('email query', email)

        const messages = await prisma.message.findMany({
            where: {
                authorEmail: email
            }
        })

        // console.log('res.mess', messages)

        res.status(200).json(messages)
    }
}
