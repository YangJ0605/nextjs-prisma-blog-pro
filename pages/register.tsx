import type { NextPage } from 'next'
import React from 'react'

const Login: NextPage = () => {
  return (
    <div className='pt-[160px]'>
      <div className='flex  flex-col m-auto justify-center max-w-md   rounded-md sm:p-10 bg-gray-50 text-gray-800  dark:bg-gray-900 dark:text-gray-100'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>注册</h1>
        </div>
        <form
          noValidate={false}
          action=''
          className='space-y-12 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                邮箱
              </label>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='xxx.qq.com'
                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
              />
            </div>
            <div>
              <label htmlFor='code' className='block mb-2 text-sm'>
                验证码
              </label>
              <input
                type='text'
                name='code'
                id='code'
                className='focus-visible:rounded-r-none w-3/5 sm:w-2/3 px-3 py-2 border rounded-md rounded-r-none border-gray-300 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
              />

              <button
                type='button'
                className='w-2/5 px-3 py-2  border border-purple-600 dark:border-purple-400 font-semibold rounded-r-lg sm:w-1/3 bg-purple-600 text-gray-50 dark:bg-purple-400 dark:text-gray-900'
              >
                获取验证码
              </button>
            </div>
            <div>
              <div className='flex justify-between mb-2'>
                <label htmlFor='password' className='text-sm'>
                  密码
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='*****'
                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-80 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <div>
              <button
                type='button'
                className='w-full px-8 py-3 font-semibold rounded-md bg-purple-600 text-gray-50 dark:bg-purple-400 dark:text-gray-900'
              >
                注册
              </button>
            </div>
            <p className='px-6 text-sm text-center text-gray-600 dark:text-gray-400'>
              已有账号?
              <a
                rel='noopener noreferrer'
                href='#'
                className='hover:underline dark:text-purple-400 text-purple-600'
              >
                登录
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
