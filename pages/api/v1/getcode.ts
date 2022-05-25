import { generateCode } from './../../../lib/utils/generateCode'
import { NextApiHandler } from 'next'
import { sendCodeToMail } from '../../../lib/mail'
import redisClient from '../../../lib/redis'

const getCode: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { email } = req.query as {
      email?: string
    }
    if (!email)
      return res.json({
        code: -1,
        msg: 'email不能为空'
      })
    const oldCode = await redisClient.get(email)
    if (oldCode) {
      return res.json({
        msg: '5分钟内不得重复获取',
        code: -1
      })
    }
    const code = generateCode()
    await sendCodeToMail({
      code,
      email
    })
    res.json({
      msg: '发送成功!',
      code: 0
    })
  } else {
    res.status(422).json({
      code: -1,
      msg: `${req.method}不被允许`
    })
  }
}

export default getCode
