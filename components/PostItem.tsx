import React from 'react'

export type Post = {
  id: string
  title: string
  time: string
  tags: string[]
  author: string
  content: string
}

export default function PostItem({ time, title, tags, author, content }: Post) {
  return (
    <div className='container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900 bg-gray-50 mb-[16px] last:mb-0'>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-gray-600 dark:text-gray-400'>{time}</span>
        <div>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className='px-2 py-1 mr-[8px] last:mr-0 font-bold bg-blue-600 rounded dark:bg-blue-400 dark:text-gray-900 text-gray-50'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className='mt-3'>
        <a
          rel='noopener noreferrer'
          href='#'
          className='text-2xl font-bold hover:underline'
        >
          {title}
        </a>
        <p className='mt-2'>{content}</p>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <a
          rel='noopener noreferrer'
          href='#'
          className='text-blue-600 hover:underline dark:text-blue-400'
        >
          查看更多
        </a>
        <div>
          <a rel='noopener noreferrer' href='#' className='flex items-center'>
            <span className='text-gray-600 hover:underline dark:text-gray-400'>
              {author}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
