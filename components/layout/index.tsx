import React, { ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = props => {
  return (
    <div className='h-screen w-screen'>
      <Header />
      <main className='w-full h-[calc(100%-64px)]'>{props.children}</main>
    </div>
  )
}

export default Layout
