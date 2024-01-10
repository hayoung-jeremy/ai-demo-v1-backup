'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { cls } from '@/utils'
import { useDisplay } from '@/hooks'

import Navigation from './Navigation'
import { AILogo, AltavaLogoIconOnly } from '../icons'

const Header = () => {
  const { isMobile } = useDisplay()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [currentPageIdx, setCurrentPageIdx] = useState(-1)

  useEffect(() => {
    // Save currentPageIdx to local storage on page refresh or beforeunload event
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('currentPageIdx', currentPageIdx.toString())
    })

    // Read currentPageIdx from local storage and set setCurrentPageIdx
    const currentPageIdxFromStorage = localStorage.getItem('currentPageIdx')
    if (currentPageIdxFromStorage !== null) {
      setCurrentPageIdx(parseInt(currentPageIdxFromStorage))
    }
  }, [currentPageIdx])

  return (
    <header
      className={cls(
        'fixed top-0 left-0 z-[20]',
        'flex items-center justify-center',
        'w-full h-[60px] xl:h-[80px]',
        'backdrop-blur-md',
        'px-4',
        'bg-white/80'
      )}>
      <div className='flex justify-between items-center w-full md:max-w-[1000px] desktop:max-w-[1280px]'>
        <Link
          href='/'
          onClick={() => {
            setCurrentPageIdx(-1)
            localStorage.setItem('currentPageIdx', '-1')
          }}
          className='flex items-center justify-center gap-[10px]'>
          <AltavaLogoIconOnly width={28} height={28} />
          <AILogo width={100} />
        </Link>
        <Navigation
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          currentPageIdx={currentPageIdx}
          setCurrentPageIdx={setCurrentPageIdx}
        />
        {isMobile && <button onClick={() => setIsNavOpen(true)}>click</button>}
      </div>
    </header>
  )
}

export default Header
