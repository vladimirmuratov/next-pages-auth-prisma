import prisma from '@/prisma'

export default async function handler(req, res) {
    // console.log('req.query', req.query)
    if (req.method === 'DELETE') {
        const {id} = req.query
        const result = await prisma.message.delete({
            where: {
                id: +id
            }
        })
        if (result.id) {
            res.status(200).json({id: result.id})
        }else {
            res.status(404).json({error: `message id=${id} not found`})
        }
    }
}
