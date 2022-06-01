import Button from '@/components/Button'
import PostItem, { Post } from '@/components/PostItem'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import dayjs from 'dayjs'

type IPost = {
  id: string
  content: string
  title: string
  tags: string[]
  updatedAt: string
  createdAt: string
  author: {
    id: string
    username: string
  }
  comment: {
    id: string
    userId: string
    user: {
      username: string
    }
  }[]
}

const Home: NextPage<{ posts: Post[]; total: number }> = ({ posts }) => {
  return (
    <div className='w-full pt-[32px] h-full text-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-100'>
      {posts.map((post, idx) => (
        <PostItem {...post} key={post.id} />
      ))}
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ctx => {
  async function getPosts() {
    const { data } = await axios.get('http://localhost:3000/api/v1/posts')
    const { posts, total } = data as { posts: IPost[]; total: number }
    const postsData = posts.map(post => ({
      id: post.id,
      title: post.title,
      time: dayjs(post.createdAt).format('YYYY-MM-DD HH:mm'),
      tags: post.tags,
      author: post.author.username,
      content: post.content
    }))
    return { postsData, total }
  }
  const { postsData, total } = await getPosts()
  return {
    props: {
      posts: postsData,
      total
    }
  }
}
