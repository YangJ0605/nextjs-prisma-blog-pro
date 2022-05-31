import { NextApiHandler } from 'next'
import prisma from '@/lib/prisma'
import { emailRegexp, passwordRegexp } from '@/lib/regexp'

const login: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body as {
      username: string
      password: string
    }
    if (!username) {
      return res.json({
        code: -1,
        msg: '邮箱不能为空'
      })
    }
    if (!emailRegexp.test(username)) {
      return res.json({
        code: -1,
        msg: '邮箱格式错误'
      })
    }
    if (!passwordRegexp.test(password)) {
      return res.json({
        code: -1,
        msg: '密码格式错误（以字母开头，长度在6~18之间，只能包含字母、数字和下划线）'
      })
    }
    if (!password.trim()) {
      return res.json({
        code: -1,
        msg: '密码不能为空'
      })
    }
    const sqlUser = await prisma.user.findUnique({
      where: {
        username
      }
    })
    if (!sqlUser) {
      return res.json({
        code: -1,
        msg: '该邮箱未注册'
      })
    }
    if (sqlUser.password !== password) {
      return res.json({
        code: -1,
        msg: '密码不匹配'
      })
    }
    res.json({
      code: 0,
      msg: '登录成功'
    })
  } else {
    res.status(422).json({
      code: -1,
      msg: 'err method'
    })
  }
}

export default login
