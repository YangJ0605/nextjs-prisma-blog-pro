import Form from '@/components/Form'
import { FiledItem } from '@/components/Form/FormItem'
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import $message from '@/components/message'

const Login: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (v: Record<string, string | number>) => {
    console.log(v)
  }

  const getCode = () => {
    $message.success('获取验证码成功')
    const { email } = formRef.current?.value as Record<string, string>
    if (!email) return
    // axios.get('/api/getCode').then(res => {})
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
    },
    {
      label: '验证码',
      name: 'code',
      required: true,
      type: 'text',
      render({ name, label, required, type }) {
        return (
          <>
            <label
              htmlFor={name}
              className='block text-sm text-gray-800 dark:text-gray-200'
            >
              {label}
            </label>
            <div className='flex items-center justify-between'>
              <input
                required={required}
                type={type}
                name={name}
                id={name}
                className='block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
              <button
                onClick={getCode}
                type='button'
                className='w-2/5 px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
              >
                获取验证码
              </button>
            </div>
          </>
        )
      }
    }
  ]

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
        <h1 className='text-3xl font-semibold text-center text-gray-700 dark:text-white'>
          注册
        </h1>

        <Form
          formRef={formRef}
          fileds={fileds}
          submitText='注册'
          onSubmit={handleSubmit}
        ></Form>

        <p className='mt-8 text-xs font-light text-center text-gray-400'>
          已有账号？
          <Link href='/login'>
            <a className='font-medium text-gray-700 dark:text-gray-200 hover:underline'>
              去登录
            </a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
