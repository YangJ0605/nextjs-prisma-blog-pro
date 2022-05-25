import { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const post: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true
          }
        },
        comment: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                username: true
              }
            }
          }
        }
      }
    })
    res.json(posts)
  } else {
    res.status(422).json({
      code: -1,
      msg: 'err method'
    })
  }
}

export default post
