import prisma from '@/prisma'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.userEmail
        const url = req.body.url

        const response = await prisma.video.create({
            data: {
                userEmail,
                url
            }
        })

        res.status(201).json(response)
    }

    if (req.method === 'GET') {
        const userEmail = req.query.userEmail

        const videos = await prisma.video.findMany({
            where: {
                userEmail
            },
            select: {
                id: true,
                url: true
            }
        })

        res.status(200).json(videos)
    }
}
