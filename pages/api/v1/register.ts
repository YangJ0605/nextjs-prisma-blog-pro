import { NextApiHandler } from 'next'
import { validateUser } from '../../../lib/validate/user'
import prisma from '../../../lib/prisma'

const register: NextApiHandler = async (req, res) => {
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
  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  })
  console.log('user', user)
  res.status(200).json({
    msg: '注册成功'
  })
}

export default register
