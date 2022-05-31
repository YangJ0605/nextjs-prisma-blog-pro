import { NextApiHandler } from 'next'
import { validateUser } from '../../../lib/validate/user'
import prisma from '../../../lib/prisma'

const register: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password, code } = req.body as {
      username: string
      password: string
      code: string
    }
    const oldCode = await redisClient?.get(username)
    if (oldCode !== code) {
      res.json({
        code: -1,
        msg: '验证码错误!'
      })
      return
    }
    const { hasError, errMsg } = await validateUser({ username, password })
    if (hasError) {
      res.json({
        msg: errMsg,
        code: -1
      })
      return
    }
    try {
      await prisma.user.create({
        data: {
          username,
          password
        }
      })
      await redisClient?.del(username)
      res.status(200).json({
        msg: '注册成功',
        code: 0
      })
    } catch (error) {
      res.json({
        code: -1,
        msg: '注册失败' + JSON.stringify(error)
      })
    }
  } else {
    res.status(422).json({
      code: -1,
      msg: 'err method'
    })
  }
}

export default register
