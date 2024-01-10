'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { generatedImgState, imgGeneratingState } from '@/store/generate'

import { cls } from '@/utils'
import RadialCircleLoader from '../RadialCircleLoader'
import AfterImageGenerated from './AfterImageGenerated'
import TryoutExamples from './TryoutExamples'

const ImagePreviewer = () => {
  const isImgGenerating = useRecoilValue(imgGeneratingState)
  const generatedImage = useRecoilValue(generatedImgState)

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='order-3 md:order-2 aspect-square row-span-2 flex items-center justify-center'>
      <AnimatePresence>
        {isImgGenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col gap-12 items-center justify-center relative w-full h-full'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 30 }}
              className={cls(
                'absolute top-0 left-0',
                'w-full h-full',
                'bg-grayscale-700/50 z-[-1]'
              )}
            />
            <RadialCircleLoader width={120} height={120} />
            <p className='absolute top-[62%] text-[32px] text-grayscale-600/80 text-shadow-white'>
              Generating ...
            </p>
          </motion.div>
        ) : generatedImage ? (
          <AfterImageGenerated />
        ) : (
          <TryoutExamples />
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default ImagePreviewer
