'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cls } from '@/utils'

interface Props {
  sectionTitle?: string
  className?: string
  children: React.ReactNode
}

const Section = ({ sectionTitle, className, children }: Props) => {
  return (
    <section
      className={cls(
        className ? className : '',
        'md:max-w-[1000px] mx-auto desktop:max-w-[1280px] min-h-screen mb-[80px] first-of-type:pt-[80px] xl:first-of-type:pt-[120px] last-of-type:mb-0'
      )}>
      {sectionTitle ? (
        <motion.h2
          initial={{ opacity: 0, translateX: -8 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className='text-[28px]'>
          {sectionTitle}
        </motion.h2>
      ) : null}
      {children}
    </section>
  )
}

export default Section
