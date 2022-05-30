import React, { ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = props => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header />
      <main className='flex-1'>{props.children}</main>
    </div>
  )
}

export default Layout
