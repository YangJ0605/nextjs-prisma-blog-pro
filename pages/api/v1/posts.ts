import { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const post: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const postsCount = await prisma.post.count()
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        createdAt: true,
        tags: true,
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
        },
        _count: {
          select: {
            comment: true
          }
        }
      }
    })

    res.json({
      code: 0,
      posts,
      total: postsCount
    })
  } else {
    res.status(422).json({
      code: -1,
      msg: 'err method'
    })
  }
}

export default post
