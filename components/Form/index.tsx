import React, { RefObject, useEffect, useState } from 'react'
import FormItem, { FiledItem } from './FormItem'

type Props = {
  formRef?: RefObject<HTMLFormElement>
  fileds: FiledItem[]
  onSubmit?: (value: Record<string, string | number>) => void
  submitText?: string
}

export default function Form({ formRef, fileds, onSubmit, submitText }: Props) {
  const [, forceUpdate] = useState({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef) return
    const value = getFormData(formRef.current!)
    onSubmit?.(value)
  }

  function getFormData(form: HTMLFormElement) {
    const formData = new FormData(form)
    const keys = Array.from(formData.keys())
    const value: Record<string, string> = {}
    keys.forEach(key => {
      value[key] = formData.get(key) as string
    })
    return value
  }

  useEffect(() => {
    if (!formRef) return
    formRef.current!.value = getFormData(formRef.current!)
  })

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {fileds.map((filed, index) => (
        <div key={filed.name} className={`${index === 0 ? '' : 'mt-4'}`}>
          <FormItem {...filed} forceUpdate={() => forceUpdate({})} />
        </div>
      ))}
      {submitText && (
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
          >
            {submitText}
          </button>
        </div>
      )}
    </form>
  )
}
