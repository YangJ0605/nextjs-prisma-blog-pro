import React from 'react'

type Props = {
  onClick?: () => void
}

export default function MoonIcon(props: Props) {
  return (
    <button className='hidden mx-4 text-gray-600 transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="切换暗黑主题'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        aria-hidden='true'
        className='w-10 h-10 text-gray-900 '
        role='button'
        onClick={props.onClick}
      >
        <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
      </svg>
    </button>
  )
}
