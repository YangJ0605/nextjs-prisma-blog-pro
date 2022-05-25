import { PrismaClient } from '@prisma/client'
import { Transporter } from 'nodemailer'
import { RedisClientType } from 'redis'

declare global {
  var prisma: PrismaClient | undefined
  var redisClient: RedisClientType | undefined
  var transporter: Transporter | undefined
}
