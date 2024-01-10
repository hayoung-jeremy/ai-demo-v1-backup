'use client'
import React, { useState } from 'react'
import { cls } from '@/utils'
import ModelSelector from './ModelSelector'
import GenerateButton from './GenerateButton'

const Generator = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  return (
    <div
      className={cls(
        'flex items-center justify-end',
        'w-full h-[80px]',
        'bg-grayscale-50',
        'text-grayscale-800'
      )}>
      <ModelSelector isSelectorOpen={isSelectorOpen} setIsSelectorOpen={setIsSelectorOpen} />
      <GenerateButton isSelectorOpen={isSelectorOpen} />
    </div>
  )
}

export default Generator
