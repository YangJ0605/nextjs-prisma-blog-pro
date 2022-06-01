import { createTransport, SendMailOptions, Transporter } from 'nodemailer'
import redisClient from '../redis'
import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
import ejs from 'ejs'

let transporter: Transporter

const { serverRuntimeConfig } = getConfig()
const mailFilePath = path.join(
  serverRuntimeConfig.PROJECT_ROOT,
  './public/mail.ejs'
)

const htmlStr = fs.readFileSync(mailFilePath).toString()

if (process.env.NODE_ENV === 'production') {
  transporter = createTransport({
    service: 'qq',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })
} else {
  if (!global.transporter) {
    global.transporter = createTransport({
      service: 'qq',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  transporter = global.transporter
}

export const sendCodeToMail = async ({
  code,
  email
}: {
  code: string | number
  email: string
}) => {
  const html = ejs.render(htmlStr, {
    code,
    action: '注册账号'
  })
  const options: SendMailOptions = {
    from: '"cc👻" < ' + process.env.EMAIL + ' >',
    to: email,
    subject: '验证码',
    html
  }

  await transporter.sendMail(options)
  await redisClient.set(email, code)
  await redisClient.expire(email, 60 * 5)
}
