import React from 'react'

interface Props {
  width?: number
  height?: number
}

const MagicWand = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg height={width} width={height} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14 10L5 19M17 7L19 5M11 7L9 5M19 15L17 13M14 6V5M14 16V15M18 10H19M8 10H9'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export default MagicWand
