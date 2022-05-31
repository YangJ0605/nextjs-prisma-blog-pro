import React, { ReactElement, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorMessage from './error'
import InfoMessage from './info'
import Success from './success'
import WarnMessage from './warn'

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

export type IMessageTemplateProps = {
  text: string
}

const cpnMap: Record<IMessgeType, (text: string) => ReactElement> = {
  success: (text: string) => <Success text={text} />,
  info: (text: string) => <InfoMessage text={text} />,
  error: (text: string) => <ErrorMessage text={text} />,
  warning: (text: string) => <WarnMessage text={text} />
}

type IMessage = {
  id: string
  type: IMessgeType
  text: string
  show: boolean
  duration?: number
}

const genId = () => Date.now().toString()
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let add: (l: Omit<IMessage, 'show'>) => Promise<string>
let removeChild: (id: string) => Promise<undefined>

function MessageContainer() {
  const [messageList, setMessageList] = useState<Omit<IMessage, 'show'>[]>([])
  const [activeIds, setActiveIds] = useState<string[]>([])

  add = async l => {
    setMessageList(preList => [...preList, l])
    setActiveIds(preIds => [...preIds, l.id])
    return l.id
  }

  removeChild = async (id: string) => {
    await sleep(1500)
    const m = messageList.find(l => l.id === id)
    setActiveIds(preActiveIds => preActiveIds.filter(i => i !== id))
    await sleep(m!.duration || 500)
    setMessageList(preList => preList.filter(l => l.id !== id))
    return undefined
  }

  // useEffect(() => {
  //   if (messageList.length > 10) {
  //     const { id } = messageList.shift()!
  //     setMessageList(preList => preList.filter(l => l.id !== id))
  //   }
  // }, [messageList])

  return (
    <div className='fixed top-0 left-0 flex flex-col w-screen z-5000'>
      {messageList.map(item => (
        <Message
          type={item.type}
          text={item.text}
          key={item.id}
          show={activeIds.includes(item.id)}
          id={item.id}
        />
      ))}
    </div>
  )
}

function Message(props: IMessage) {
  return (
    <div
      className={`m-2 message-animation ${
        props.show ? '' : 'message-animation-hidden'
      }`}
      // @ts-ignore
      style={{ '--duration--': props.duration || 500 }}
    >
      {cpnMap[props.type](props.text)}
    </div>
  )
}

const $message = {
  success: async (text: string) => {
    const id = await add({
      id: genId(),
      text,
      type: 'success'
    })
    await removeChild(id)
  },
  info: async (text: string) => {
    const id = await add({
      id: genId(),
      text,
      type: 'info'
    })
    await removeChild(id)
  },
  error: async (text: string) => {
    const id = await add({
      id: genId(),
      text,
      type: 'error'
    })
    await removeChild(id)
  },
  warning: async (text: string) => {
    const id = await add({
      id: genId(),
      text,
      type: 'warning'
    })
    await removeChild(id)
  }
}

export default $message
