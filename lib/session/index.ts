import type { IronSessionOptions } from 'iron-session'

export const sessionOptions: IronSessionOptions = {
  password: 'f97a4dab-9824-4c9e-ad5a-ae1a23e79219',
  cookieName: 'nextjs/blog',
  cookieOptions: {
    secure: false
  }
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {}
  }
}
