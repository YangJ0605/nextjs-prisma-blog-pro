import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

const options: ConstructorParameters<typeof PrismaClient>[0] = {
  log: [
    {
      emit: 'stdout',
      level: 'query'
    },
    {
      emit: 'stdout',
      level: 'error'
    },
    {
      emit: 'stdout',
      level: 'info'
    },
    {
      emit: 'stdout',
      level: 'warn'
    }
  ]
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(options)
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options)
  }
  prisma = global.prisma
}
export default prisma
