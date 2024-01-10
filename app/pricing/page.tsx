'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { Section } from '@/components/layout'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const childVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 16,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const Pricing = () => {
  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <Section sectionTitle='Pricing'>
      Pricing info goes here
      <h2 className='text-[20px] my-5'>Test</h2>
      <motion.ul
        className='flex flex-col gap-2'
        initial={'closed'}
        variants={variants}
        animate={'open'}>
        {[1, 2, 3].map((_, index) => {
          return (
            <motion.li
              key={index}
              className='bg-grayscale-800 w-[200px] px-4 py-2 rounded-md'
              variants={childVariants}>
              {index}
            </motion.li>
          )
        })}
      </motion.ul>
    </Section>
  )
}

export default Pricing
