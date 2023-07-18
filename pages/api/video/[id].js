import prisma from '@/prisma'

export default async function handler(req, res) {
    if(req.method === 'DELETE'){
        const id = req.query.id

        const response = await prisma.video.delete({
            where: {
                id: +id
            }
        })

        res.status(200).json(response)
    }
}
