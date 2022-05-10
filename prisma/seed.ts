import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    username: 'cc7',
    password: '123456'
  },
  {
    username: 'admin4',
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
    await prisma.post.create({
      data: {
        title: `post ${u.username}`,
        content: `content ${u.username}`
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
