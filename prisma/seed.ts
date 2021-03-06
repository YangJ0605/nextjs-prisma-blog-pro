import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const userData: Prisma.UserCreateInput[] = [
  {
    username: '安其拉',
    password: '123456'
  },
  {
    username: '虞姬',
    password: '123456'
  }
]

async function main() {
  console.log('start seeding ...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(user)
    const post = await prisma.post.create({
      data: {
        title: `${u.username}的文章`,
        content: `${u.username}的文章内容`,
        authorId: user.id,
        tags: ['javascript', 'typescript']
      }
    })

    await prisma.comment.create({
      data: {
        userId: user.id,
        postId: post.id,
        content: '牛逼！！！'
      }
    })

    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}
