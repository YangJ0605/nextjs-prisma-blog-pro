import React, { ReactElement, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Success from './success'

function initModalContainer() {
  if (!globalThis.document) return
  let ele = document.getElementById('message-container')
  if (!ele) {
    let container = document.createElement('div')
    container.id = 'message-container'
    document.body.appendChild(container)
    ele = document.getElementById('message-container')
    const root = createRoot(container!)
    root.render(<MessageContainer />)
  }
}
initModalContainer()

type IMessgeType = 'success' | 'info' | 'warning' | 'error'

const cpnMap: Record<IMessgeType, ReactElement> = {
  success: <Success />
}

type IMessage = {
  id: string
  type: IMessgeType
  text: string
  duration?: number
}

const genId = () => (Math.random() * 1000).toFixed()

let add: (l: IMessage) => string

function MessageContainer() {
  const [messageList, setMessageList] = useState<IMessage[]>([])

  const remove = (id: string) => {
    setMessageList(preList => preList.filter(l => l.id !== id))
  }

  add = (l: IMessage) => {
    setMessageList(preList => {
      const timeId = setTimeout(() => {
        remove(l.id)
        clearTimeout(timeId)
      }, l.duration || 2000)
      return [...preList, l]
    })
    return l.id
  }

  useEffect(() => {
    if (messageList.length > 10) {
      const { id } = messageList.shift()!
      setMessageList(preList => preList.filter(l => l.id !== id))
    }
  }, [messageList])

  return (
    <div className='w-screen fixed z-5000 left-0 top-0 flex flex-col'>
      {messageList.map(item => (
        <Message type={item.type} text={item.text} key={item.id} />
      ))}
    </div>
  )
}

function Message(props: { type: IMessgeType; text: string }) {
  return cpnMap['success']
}

const $message = {
  success: (text: string) => {
    console.log('test', text)
    add({
      id: genId(),
      text,
      type: 'success'
    })
  }
}

export default $message
