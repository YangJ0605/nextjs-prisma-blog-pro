import React from 'react'

const Button: React.FC = props => {
  return (
    <button
      type='button'
      className='px-8 py-3 divide-x rounded bg-purple-600 text-gray-100 divide-gray-300 dark:bg-purple-400 dark:text-gray-800'
    >
      Caret
    </button>
  )
}

export default Button
