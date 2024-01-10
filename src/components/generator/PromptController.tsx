'use client'
import React from 'react'
import { motion } from 'framer-motion'

import { cls } from '@/utils'
import TextPromptInput from './TextPromptInput'
import Generator from './Generator'

const PromptController = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cls(
        'order-2 md:order-3',
        'bg-grayscale-800',
        'aspect-square',
        'flex flex-col items-center justify-between',
        'relative'
      )}>
      <div />
      <TextPromptInput />
      <Generator />
    </motion.article>
  )
}

export default PromptController
