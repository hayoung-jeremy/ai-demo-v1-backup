import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { generatedImgState } from '@/store/generate'

import { cls } from '@/utils'
import { Delete, Download } from '../icons'

const AfterImageGenerated = () => {
  const [generatedImage, setGeneratedImage] = useRecoilState(generatedImgState)

  const handleDownload = async () => {
    if (!generatedImage) return
    const res = await axios.get(generatedImage, { responseType: 'blob' })
    const blob = await res.data.arrayBuffer()
    const url = URL.createObjectURL(new Blob([blob], { type: 'image/png' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'generated_image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const removeImage = () => {
    setGeneratedImage(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='relative w-full h-full group'>
      <Image
        src={generatedImage ?? ''}
        alt='generated image'
        fill
        style={{ objectFit: 'contain' }}
        className='select-none'
      />
      <div
        className={cls(
          'absolute left-0 bottom-[0%] hidden group-hover:animate-fadeIn group-hover:flex',
          'w-full h-[100px]',
          'px-6',
          'items-center justify-end gap-3',
          'bg-gradient-to-t from-black/80',
          'transition-all',
          'text-grayscale-700'
        )}>
        <button onClick={() => removeImage()} className='btn negative iconOnly'>
          <Delete />
        </button>
        <button
          onClick={handleDownload}
          className='btn outlined iconOnly backdrop-blur-sm border-grayscale-600/60 hover:bg-grayscale-800/10 hover:border-grayscale-800/60 hover:text-grayscale-800'>
          <Download />
        </button>
      </div>
    </motion.div>
  )
}

export default AfterImageGenerated
