import Form from '@/components/Form'
import { FiledItem } from '@/components/Form/FormItem'
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useRef } from 'react'

const Login: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (v: Record<string, string | number>) => {
    console.log(v)
  }

  const fileds: FiledItem[] = [
    {
      label: '邮箱',
      name: 'email',
      required: true,
      type: 'email'
    },
    {
      label: '密码',
      name: 'password',
      required: true,
      type: 'password'
    }
  ]

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <h1 className='text-3xl font-semibold text-center text-gray-700 dark:text-white'>
          登录
        </h1>

        <Form
          formRef={formRef}
          fileds={fileds}
          submitText='登录'
          onSubmit={handleSubmit}
        ></Form>

        <p className='mt-8 text-xs font-light text-center text-gray-400'>
          还没账号？
          <Link href='/register'>
            <a className='font-medium text-gray-700 dark:text-gray-200 hover:underline'>
              创建一个
            </a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
