import { NextApiHandler } from 'next'
import { validateUser } from '../../../lib/validate/user'
import prisma from '../../../lib/prisma'

const register: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body as {
      username: string
      password: string
    }

    const { hasError, errMsg } = await validateUser({ username, password })
    if (hasError) {
      res.status(400).json({
        errMsg
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
      res.status(200).json({
        msg: '注册成功',
        code: 0
      })
    } catch (error) {
      res.status(400).json({
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
