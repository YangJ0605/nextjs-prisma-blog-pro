import React from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'
import { marked } from 'marked'

export default function PostDetail({ post }: { post: Post }) {
  // console.log(marked())
  return (
    <div className='w-full min-h-full flex items-center flex-col p-[32px]'>
      <article
        className='markdown-body flex-1 w-[800px]'
        dangerouslySetInnerHTML={{
          __html: marked('# Marked in browser\n\nRendered by **marked**.')
        }}
      ></article>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<any> = withIronSessionSsr(
  // @ts-ignore
  async ctx => {
    const user = ctx.req.session.user || null
    if (user && user.id) {
      user.login = true
    }
    const postId = Number(ctx.params?.id as string)
    if (isNaN(postId)) {
      return {
        props: {
          initialStoreState: user,
          post: null
        },
        redirect: {
          permanent: false,
          destination: ctx.query.redirect || '/'
        }
      }
    }
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    })
    const formatPost = {
      ...post,
      createdAt: post?.createdAt.toString(),
      updatedAt: post?.updatedAt.toString()
    }
    return {
      props: {
        initialStoreState: user,
        post: formatPost
      }
    }
  },
  sessionOptions
)
