import React, { HTMLInputTypeAttribute, useState } from 'react'

export interface FiledItem {
  label: string | number
  name: string
  required?: boolean
  type?: HTMLInputTypeAttribute
  render?: (row: FiledItem) => React.ReactElement
  value?: string | number
  forceUpdate?: (v: any) => void
}

export default function FormItem({
  label,
  name,
  required,
  type,
  render,
  forceUpdate
}: FiledItem) {
  return render ? (
    render({ label, name, required, type })
  ) : (
    <>
      <label
        htmlFor={name}
        className='block text-sm text-gray-800 dark:text-gray-200'
      >
        {label}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        id={name}
        onBlur={() => forceUpdate?.({})}
        className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
      />
    </>
  )
}
