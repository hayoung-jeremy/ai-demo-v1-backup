'use client'
import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

import { cls } from '@/utils'
import { useDisplay } from '@/hooks'
import { navMenu } from '@/constants'

interface Props {
  isNavOpen: boolean
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  currentPageIdx: number
  setCurrentPageIdx: Dispatch<SetStateAction<number>>
}

const Navigation = ({ isNavOpen, setIsNavOpen, currentPageIdx, setCurrentPageIdx }: Props) => {
  const { isMobile } = useDisplay()
  return (
    <nav
      className={cls(
        'fixed top-0 left-0 w-full h-screen',
        'bg-gradient-to-tr from-[#e1d9eb] to-[#ffffff]',
        'xl:static',
        'xl:w-fit xl:h-full',
        'xl:bg-transparent xl:from-transparent xl:to-transparent',
        'transition-all',
        isNavOpen ? '' : 'translate-x-[100%] xl:translate-x-0'
      )}>
      <ul
        className={cls(
          'h-full',
          'flex flex-col items-center justify-center gap-2',
          'xl:flex-row xl:gap-10'
        )}>
        {navMenu.map((item, index) => {
          return (
            <li key={index} className='w-fit relative'>
              <Link
                href={item.url}
                onClick={() => {
                  setIsNavOpen(false)
                  setCurrentPageIdx(index)
                  localStorage.setItem('currentPageIdx', index.toString())
                }}
                className={cls(
                  'w-full',
                  'px-4 py-2',
                  'flex items-center justify-center',
                  'hover:text-primary',
                  'transition-all after:transition-all after:duration-300',
                  'cursor-pointer',
                  'after:w-[16px] after:h-[16px] after:rounded-full',
                  'after:blur-[12px]',
                  'after:absolute after:top-[50%] after:left-1/2 after:z-[-1]',
                  'after:translate-x-[-50%] after:translate-y-[-50%]',
                  currentPageIdx === index ? 'text-primary after:bg-primary/80' : ''
                )}>
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
