import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import DropDown, { DropdownOption } from '../DropDown'
import MoonIcon from '../icon/MoonIcon'
import SunIcon from '../icon/SunIcon'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [navIsOpen, setNavIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      if ((e.target as Window).innerWidth > 768) {
        setNavIsOpen(true)
      } else {
        setNavIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const renderThemeChanger = useMemo(
    // eslint-disable-next-line react/display-name
    () => {
      // svg某些属性在ssr不支持
      if (!mounted) return null

      if (theme === 'dark') {
        return <SunIcon onClick={() => setTheme('light')} />
      } else {
        return <MoonIcon onClick={() => setTheme('dark')} />
      }
    },
    [theme, setTheme, mounted]
  )

  const onDropDownSelect = (key: string | number, option: DropdownOption) => {
    console.log(key, option)
  }

  return (
    <nav className='bg-white shadow dark:bg-gray-800 flex-shrink-0 flex-grow-0'>
      <div className='container px-6 py-4 mx-auto'>
        <div className='md:flex md:items-center md:justify-between'>
          <div className='flex items-center justify-between'>
            <div className='text-xl font-semibold text-gray-700'>
              <Link href='/'>
                <a className='text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300'>
                  Blog
                </a>
              </Link>
            </div>

            <div
              className='flex md:hidden'
              onClick={() => setNavIsOpen(v => !v)}
            >
              <button
                type='button'
                className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
                aria-label='toggle menu'
              >
                <svg viewBox='0 0 24 24' className='w-6 h-6 fill-current'>
                  <path
                    fillRule='evenodd'
                    d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`flex-1 md:flex md:items-center md:justify-between ${
              navIsOpen ? 'opend' : 'hidden'
            }`}
          >
            <div className='flex flex-col -mx-4 md:flex-row md:items-center md:mx-8'>
              <a
                href='#'
                className='px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
              >
                关于
              </a>
            </div>

            <div className='flex items-center mt-4 md:mt-0'>
              {renderThemeChanger}
              <DropDown
                options={[
                  {
                    label: '退出登录',
                    key: 'logout'
                  }
                ]}
                onSelect={onDropDownSelect}
              >
                <button
                  type='button'
                  className='flex items-center focus:outline-none'
                  aria-label='toggle profile dropdown'
                >
                  <div className='w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full'>
                    <Image
                      src='/default.webp'
                      className='object-cover w-full h-full'
                      alt='avatar'
                      width='100%'
                      height='100%'
                    />
                  </div>
                </button>
              </DropDown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
