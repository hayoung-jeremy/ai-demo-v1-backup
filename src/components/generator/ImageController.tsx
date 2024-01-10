'use client'
import React, { useState } from 'react'

import { motion } from 'framer-motion'

import CreationMethodSelector from './CreationMethodSelector'
import CreationMethodIndicator from './CreationMethodIndicator'
import ImageUploader from './ImageUploader'

const ImageController = () => {
  const [currentMethodIdx, setCurrentMethodIdx] = useState(0)

  return (
    <motion.article
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='relative bg-grayscale-50 text-grayscale-800 aspect-square'>
      <CreationMethodSelector
        currentMethodIdx={currentMethodIdx}
        setCurrentMethodIdx={setCurrentMethodIdx}
      />
      <div className="className='w-full h-full flex items-center justify-center aspect-square">
        {currentMethodIdx === 0 && (
          <p className='text-center text-grayscale-400'>
            Easily create an image from scratch <br /> with our AI image generator <br /> by
            entering descriptive text.
          </p>
        )}
        {currentMethodIdx === 1 && <ImageUploader />}
        {currentMethodIdx === 2 && <div>inpainting</div>}
      </div>
      <CreationMethodIndicator currentMethodIdx={currentMethodIdx} />
    </motion.article>
  )
}

export default ImageController
