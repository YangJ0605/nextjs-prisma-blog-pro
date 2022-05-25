import { createClient, RedisClientType } from 'redis'

let redisClient: RedisClientType

if (process.env.NODE_ENV === 'production') {
  redisClient = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASS
  })
  redisClient.connect()
} else {
  if (!global.redisClient) {
    global.redisClient = createClient({
      url: process.env.REDIS_URL,
      password: process.env.REDIS_PASS
    })
    global.redisClient.connect()
  }
  redisClient = global.redisClient
}

export default redisClient
