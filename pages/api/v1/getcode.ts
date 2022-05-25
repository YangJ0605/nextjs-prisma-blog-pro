import { generateCode } from './../../../lib/utils/generateCode'
import { NextApiHandler } from 'next'
import { sendCodeToMail } from '../../../lib/mail'

const getCode: NextApiHandler = async (req, res) => {
  const { email } = req.body as {
    email: string
  }

  const code = generateCode()
  await sendCodeToMail({
    code,
    email
  })
}

export default getCode
