import { User } from '@prisma/client'
import prisma from '../prisma'
import { emailRegexp } from '../regexp'

export const validateUser = async (
  user: Pick<User, 'username' | 'password'>
) => {
  let hasError = false,
    errMsg = ''
  if (!user.username) {
    hasError = true
    errMsg = '邮箱不能为空'
    return {
      hasError,
      errMsg
    }
  }
  if (!emailRegexp.test(user.username)) {
    hasError = true
    errMsg = '邮箱格式错误'
    return {
      hasError,
      errMsg
    }
  }
  if (!user.password) {
    hasError = true
    errMsg = '密码不能为空'
    return {
      hasError,
      errMsg
    }
  }
  if (user.password.length < 6) {
    hasError = true
    errMsg = '密码长度不能小于6位'
    return {
      hasError,
      errMsg
    }
  }
  if (user.password.length > 16) {
    hasError = true
    errMsg = '密码长度不能大于16位'
    return {
      hasError,
      errMsg
    }
  }
  const sqlUser = await prisma.user.findUnique({
    where: {
      username: user.username
    }
  })

  if (sqlUser) {
    hasError = true
    errMsg = '该邮箱已注册'
    return {
      hasError,
      errMsg
    }
  }

  return {
    hasError,
    errMsg
  }
}
