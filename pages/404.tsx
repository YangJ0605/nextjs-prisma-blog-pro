import Button from '@/components/Button'
import type { NextPage } from 'next'
import { useLayoutEffect } from 'react'

const Error404: NextPage = () => {
  return (
    <section className='flex items-center h-full w-full  p-16 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-gray-400 dark:text-gray-600'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='text-2xl font-semibold md:text-3xl'>page not found</p>
          <p className='mt-4 mb-8 text-gray-600 dark:text-gray-400'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button></Button>
        </div>
      </div>
    </section>
  )
}

export default Error404
