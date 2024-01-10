'use client'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { uploadedImgState } from '@/store/generate'

import { cls } from '@/utils'
import { creationMethodList } from '@/constants'

import { ArrowLeft, ArrowRight } from '../icons'

interface Props {
  currentMethodIdx: number
  setCurrentMethodIdx: React.Dispatch<React.SetStateAction<number>>
}

const CreationMethodSelector = ({ currentMethodIdx, setCurrentMethodIdx }: Props) => {
  const setUploadedImage = useSetRecoilState(uploadedImgState)

  useEffect(() => {
    if (currentMethodIdx !== 1) setUploadedImage(null)
  }, [currentMethodIdx, setUploadedImage])
  return (
    <div
      className={cls(
        'absolute top-0 left-0 z-10',
        'w-full',
        'flex items-center justify-between',
        'py-4 px-3',
        currentMethodIdx === 1 ? 'bg-grayscale-50/80' : ''
      )}>
      <button
        onClick={() => setCurrentMethodIdx((prev) => prev - 1)}
        disabled={currentMethodIdx === 0}
        className={cls(
          'w-10 h-10',
          'flex items-center justify-center',
          'transition-all duration-200',
          'text-grayscale-400 hover:text-grayscale-800',
          currentMethodIdx === 0 ? 'opacity-0 disabled:' : 'opacity-100'
        )}>
        <ArrowLeft width={28} height={28} />
      </button>
      <h3 className={cls('text-[24px]', currentMethodIdx === 1 ? '' : '')}>
        {creationMethodList[currentMethodIdx].label}
      </h3>
      <button
        onClick={() => setCurrentMethodIdx((prev) => prev + 1)}
        disabled={currentMethodIdx === 2}
        className={cls(
          'w-10 h-10',
          'flex items-center justify-center',
          'transition-all duration-200',
          'text-grayscale-400 hover:text-grayscale-800',
          currentMethodIdx === 2 ? 'opacity-0 :' : 'opacity-100'
        )}>
        <ArrowRight width={28} height={28} />
      </button>
    </div>
  )
}

export default CreationMethodSelector
