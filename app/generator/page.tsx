import React from 'react'
import { cls } from '@/utils'
import { ImageController, ImageGenerator, PromptController } from '@/components/generator'

const Demo2 = () => {
  return (
    <section
      className={cls(
        'md:max-w-[1000px] mx-auto desktop:max-w-[1280px]',
        'mt-[60px] md:mt-[80px]',
        'h-fit md:min-h-[calc(100vh-80px)]',
        'grid grid-cols-1 md:grid-cols-[1fr_2fr] md:grid-rows-2',
        'gap-4 md:gap-0'
      )}>
      <ImageController />
      <ImageGenerator />
      <PromptController />
    </section>
  )
}

export default Demo2
