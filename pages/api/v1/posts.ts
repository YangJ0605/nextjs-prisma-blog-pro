import { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const post: NextApiHandler = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      comment: true,
      author: true
    }
  })
  res.json(posts)
}

export default post
