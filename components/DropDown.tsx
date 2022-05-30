import React, { MouseEvent, ReactNode, useEffect, useState } from 'react'

export interface DropdownOption {
  key: string | number
  label: string | ReactNode
  disabled?: boolean
}

type Props = {
  children: ReactNode
  options: DropdownOption[]
  onSelect?: (key: string | number, option: DropdownOption) => void
}

export default function DropDown(props: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false)
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleTriggerClick = (e: MouseEvent) => {
    e.stopPropagation()
    setOpen(v => !v)
  }

  return (
    <div className='relative inline-block focus:bg-red-500'>
      <div onClick={handleTriggerClick}>{props.children}</div>

      <div
        className={`absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800 ${
          open ? 'opend' : 'hidden'
        }`}
      >
        {props.options.map(option => (
          <span
            key={option.key}
            onClick={() => {
              props.onSelect?.(option.key, option)
            }}
            className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            {option.label || option.key}
          </span>
        ))}
      </div>
    </div>
  )
}
