import { sessionOptions } from '@/lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'

const logout: NextApiHandler = (req, res) => {
  req.session.destroy()
  res.json({
    code: -1,
    msg: '退出成功'
  })
}

export default withIronSessionApiRoute(logout, sessionOptions)
