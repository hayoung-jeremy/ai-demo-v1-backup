import React from 'react'

interface Props {
  width?: number
  height?: number
}

const RadialCircleLoader = ({ width = 120, height = 120 }: Props) => {
  return (
    <div
      style={{ width, height }}
      className='relative rounded-full bg-gradient-to-tr from-grayscale-600/10 via-grayscale-800/50 to-primary/10 shadow-2xl shadow-primary/30 border border-white/50'>
      <div className='radial-circle-loader'></div>
    </div>
  )
}

export default RadialCircleLoader
