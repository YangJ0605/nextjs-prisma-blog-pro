import React, { useState } from 'react'
import { marked } from 'marked'

export default function Edit() {
  const [html, setHtml] = useState('')

  return (
    <div className='w-full h-full  flex'>
      <textarea
        className='flex-1 h-full p-[16px] border-blue-600'
        onChange={e => setHtml(e.target.value)}
      ></textarea>
      <article
        className='markdown-body flex-1 h-full p-[16px]'
        dangerouslySetInnerHTML={{
          __html: marked.parse(html)
        }}
      ></article>
    </div>
  )
}
