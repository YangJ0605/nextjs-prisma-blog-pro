import { User } from '@prisma/client'
import prisma from '../prisma'

export const validateUser = async (
  user: Pick<User, 'username' | 'password'>
) => {
  let hasError = false,
    errMsg = ''
  if (!user.username) {
    hasError = true
    errMsg = '用户名不能为空'
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
    errMsg = '用户名已存在'
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
