'use client'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

import { selectedModelState } from '@/store/generate'
import { cls } from '@/utils'
import { ArrowRight, SimpleArrowDown, SimpleArrowUp } from '../icons'

const listBg = {
  open: {
    width: '100%',
    height: '100%',
    backgroundColor: '#665975',
    transition: { duration: 0.2 },
  },
  closed: {
    width: 'calc(100% - 80px)',
    height: '80px',
    backgroundColor: '#3e3647',
    transition: { duration: 0.3, delay: 0.3 },
  },
}

const listVariants = {
  open: {
    display: 'flex',
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    display: 'none',
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const listItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      opacity: { delay: 0.3 },
      y: { stiffness: 1000, velocity: -100, duration: 0.1 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
}

const selectedModelVariants = {
  open: { y: 4, opacity: 0, transition: { duration: 0.1 } },
  closed: { y: 0, opacity: 1 },
}

const modelList = [
  { modelName: 'Clothing Style', modelId: 'sd-v1-4' },
  { modelName: 'Bags Style', modelId: 'sd-v1-4' },
  { modelName: 'Shoes Style', modelId: 'ALTAVA_SHOES_4_6000' },
  { modelName: 'Accessories Style', modelId: 'sd-v1-4' },
]

interface Props {
  isSelectorOpen: boolean
  setIsSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModelSelector = ({ isSelectorOpen, setIsSelectorOpen }: Props) => {
  const [hoveredItemIdx, setHoveredItemIdx] = useState(0)
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState)

  return (
    <motion.div
      layout
      initial={false}
      variants={listBg}
      animate={isSelectorOpen ? 'open' : 'closed'}
      className={cls(
        'absolute bottom-0 left-0 z-[1]',
        'flex flex-col items-center justify-center'
      )}>
      <button
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
        className={cls(
          'absolute bottom-0',
          'flex items-center justify-center',
          'h-[80px]',
          'transition-all duration-300',
          isSelectorOpen
            ? 'left-1/2 translate-x-[-50%] w-full hover:bottom-[-4px]'
            : 'left-0 w-[80px] hover:bottom-[4px]'
        )}>
        {isSelectorOpen ? <SimpleArrowDown /> : <SimpleArrowUp />}
      </button>
      <motion.p
        variants={selectedModelVariants}
        transition={{ duration: 0.3, delay: 0.3 }}
        className='select-none'>
        {selectedModel.modelName}
      </motion.p>
      <motion.ul
        variants={listVariants}
        className={cls('w-full', 'flex flex-col items-center justify-center')}>
        {modelList.map((item, index) => {
          return (
            <motion.li
              key={index}
              onMouseOver={() => setHoveredItemIdx(index)}
              onMouseLeave={() => setHoveredItemIdx(-1)}
              onClick={() => {
                setSelectedModel({ modelId: item.modelId, modelName: item.modelName })
                setIsSelectorOpen(false)
              }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
              variants={listItemVariants}
              className={cls(
                'group',
                'relative',
                'flex items-center justify-center gap-2',
                'py-2 px-4',
                'cursor-pointer select-none',
                'text-grayscale-500 hover:text-grayscale-800',
                'transition-all duration-200'
              )}>
              {hoveredItemIdx === index ? (
                <motion.div
                  layoutId='hoveredItem'
                  transition={{ duration: 0.15 }}
                  className='absolute top-[8px] left-[-20px]'>
                  <ArrowRight />
                </motion.div>
              ) : null}

              {item.modelName}
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.div>
  )
}

export default ModelSelector
