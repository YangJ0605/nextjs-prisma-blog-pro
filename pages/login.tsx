import Form from '@/components/Form'
import { FiledItem } from '@/components/Form/FormItem'
import $message from '@/components/message'
import { emailRegexp, passwordRegexp } from '@/lib/regexp'
import { userAtom } from '@/lib/store/user'
import axios from 'axios'
import { useSetAtom } from 'jotai'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'

const Login: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const setUser = useSetAtom(userAtom)

  const handleSubmit = async (v: Record<string, string | number>) => {
    const { email, password } = v
    if (!email) {
      $message.warning('邮箱不能为空')
      return
    }
    if (!emailRegexp.test(email as string)) {
      $message.warning('邮箱格式错误')
      return
    }
    if (!password) {
      $message.warning('密码不能为空')
      return
    }
    if (!passwordRegexp.test(password as string)) {
      $message.warning(
        '密码格式错误（以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
      )
      return
    }
    const { data } = await axios.post('/api/v1/login', {
      username: email,
      password
    })
    if (data.code === 0) {
      $message.success('登录成功!')
      router.replace((router.query.redirect as string) || '/')
      setUser({
        id: data.userId,
        username: email as string,
        login: true
      })
    } else {
      $message.error(data.msg)
    }
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

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ctx => {
    const user = ctx.req.session.user || null
    if (user && user.id) {
      console.log('cccccc')
      user.login = true
      return {
        props: {
          initialStoreState: user
        },
        redirect: {
          permanent: false,
          destination: ctx.query?.redirect || '/'
        }
      }
    }
    return {
      props: {
        initialStoreState: user
      }
    }
  },
  sessionOptions
)
