import { NextApiHandler } from 'next'
import prisma from '../../../lib/prisma'

const post: NextApiHandler = async (req, res) => {
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
}

export default post
