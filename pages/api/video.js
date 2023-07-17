import prisma from '@/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('req.body', req.body)
        const userEmail = req.body.userEmail
        const url = req.body.url

        const response = await prisma.video.create({
            userEmail,
            url
        })

        res.status(201).json(response)
    }
}
