'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cls } from '@/utils'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'
import { promptState } from '@/store/generate'

const tryoutExamples = [
  {
    prompt: 'sneakers, flowers, black',
    exampleImg: '/images/tryout_example_01.png?',
  },
  {
    prompt: 'pumps',
    exampleImg: '/images/tryout_example_02.jpeg',
  },
  {
    prompt: '(high_heels:1.4), white, gorgeous, heels',
    exampleImg: '/images/tryout_example_03.png?',
  },
  {
    prompt: 'metal shoes',
    exampleImg: '/images/tryout_example_04.png?',
  },
]

const gridVariants = {
  open: {
    transition: { staggerChildren: 0.08 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const gridChildVariants = {
  open: {
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const TryoutExamples = () => {
  const setPrompt = useSetRecoilState(promptState)

  return (
    <motion.ul
      initial={'closed'}
      animate={'open'}
      exit={'closed'}
      variants={gridVariants}
      className={cls('grid grid-cols-1', 'md:grid-cols-2 md:grid-rows-2', 'w-full')}>
      {tryoutExamples.map(({ prompt, exampleImg }) => (
        <motion.li
          variants={gridChildVariants}
          key={prompt}
          className={cls(
            'group',
            'relative',
            'overflow-hidden',
            'aspect-square',
            'transition-all duration-300'
          )}>
          <Image
            src={exampleImg}
            alt='tryout example image'
            fill
            style={{ objectFit: 'contain' }}
            className='select-none'
          />
          <div
            className={cls(
              'absolute top-0 left-0',
              'flex flex-col items-start justify-between',
              'w-full h-full',
              'px-8 py-6',
              'text-grayscale-800',
              'bg-black/50 backdrop-blur-[2px]',
              'opacity-0 group-hover:opacity-100',
              'transition-all duration-200'
            )}>
            <p className='translate-y-[-16px] group-hover:translate-y-0 transition-all'>{prompt}</p>
            <button
              onClick={() => setPrompt(prompt)}
              className={cls(
                'btn small outlined hover:bg-grayscale-800/10',
                'text-grayscale-700 hover:text-grayscale-800',
                'border-grayscale-600/40 hover:border-grayscale-600/60',
                'translate-y-[16px] group-hover:translate-y-0 transition-all'
              )}>
              Try this example
            </button>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default TryoutExamples
