import { createTransport, SendMailOptions, Transporter } from 'nodemailer'
import redisClient from '../redis'

let transporter: Transporter

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
  const options: SendMailOptions = {
    from: '"cc👻" < ' + process.env.EMAIL + ' >',
    to: email,
    subject: '验证码',
    html: `<h2>您好</2>， <p>您的邮箱验证码为${code}，五分钟有效。</p>`
  }

  try {
    await transporter.sendMail(options)
    await redisClient.set(email, code)
    await redisClient.expire(email, 5)
  } catch (error) {
    console.log('验证码发送失败', error)
  }
}
