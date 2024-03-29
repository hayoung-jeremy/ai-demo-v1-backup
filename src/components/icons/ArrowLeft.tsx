import React from 'react'

interface Props {
  width?: number
  height?: number
}

const ArrowLeft = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      height={width}
      width={height}
      fill='currentColor'
      viewBox='0 -960 960 960'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='m258.845-457.308 155.847 155.847q6.692 6.692 6.577 15.807-.116 9.115-7.193 16.192-7.076 6.692-15.999 6.692-8.923 0-16-7.077L192.155-459.769q-8.616-8.616-8.616-20.231 0-11.615 8.616-20.231l190.922-190.922q6.692-6.692 15.807-6.885 9.116-.192 15.808 6.885 7.077 7.077 7.077 16.307 0 9.231-7.077 16.307L258.845-502.692H766q9.922 0 16.307 6.385 6.384 6.384 6.384 16.307 0 9.923-6.384 16.307-6.385 6.385-16.307 6.385H258.845Z' />
    </svg>
  )
}

export default ArrowLeft
