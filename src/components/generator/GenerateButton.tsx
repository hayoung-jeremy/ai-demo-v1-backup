'use client'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'

import { cls } from '@/utils'
import { imgGeneratingState } from '@/store/generate'
import { useImageGenerator } from '@/hooks'

import { ArrowRight } from '../icons'
import SpinningLoader from '../SpinningLoader'

interface Props {
  isSelectorOpen: boolean
}

const GenerateButton = ({ isSelectorOpen }: Props) => {
  const [hoveredOnGenerateButton, setHoveredOnGenerateButton] = useState(false)
  const isImgGenerating = useRecoilValue(imgGeneratingState)
  const { generateImage } = useImageGenerator()

  useEffect(() => {
    setHoveredOnGenerateButton(false)
  }, [isImgGenerating])

  return (
    <button
      onMouseOver={() => {
        console.log('마우스 올라갔다')
        setHoveredOnGenerateButton(true)
      }}
      onMouseOut={() => {
        console.log('마우스 나갔다')
        setHoveredOnGenerateButton(false)
      }}
      onClick={generateImage}
      disabled={isImgGenerating}
      className={cls(
        'w-[80px] h-[80px]',
        'overflow-hidden',
        'flex items-center justify-center gap-5',
        'absolute bottom-0 right-0',
        'transition-all duration-300',
        'disabled:cursor-not-allowed',
        isSelectorOpen ? ' z-[0]' : ' z-[1]',
        isImgGenerating ? 'w-full bg-primary' : 'hover:w-[240px] bg-grayscale-100',
        hoveredOnGenerateButton ? 'bg-primary' : ''
      )}>
      {isImgGenerating ? (
        <>
          <SpinningLoader loaderBgColor='text-grayscale-400' loaderFillColor='fill-grayscale-500' />
          <span className='text-grayscale-600'>processing... please wait</span>
        </>
      ) : (
        <>
          <motion.p
            className={cls(
              'shrink-0 bottom-[28px] left-[0]',
              hoveredOnGenerateButton ? 'static' : 'absolute'
            )}
            initial={{ x: 20, opacity: 0 }}
            animate={
              hoveredOnGenerateButton
                ? { x: 0, opacity: 1 }
                : { x: 20, opacity: 0, transition: { duration: 0.1 } }
            }
            transition={{ duration: 0.2, delay: 0.1 }}>
            Generate styles
          </motion.p>
          <span className='shrink-0'>
            <ArrowRight />
          </span>
        </>
      )}
    </button>
  )
}

export default GenerateButton
