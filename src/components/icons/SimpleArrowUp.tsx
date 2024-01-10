import React from 'react'

interface Props {
  width?: number
  height?: number
}

const SimpleArrowUp = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      height={width}
      width={height}
      fill='currentColor'
      viewBox='0 -960 960 960'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M270.629-375.094q-7.244-7.06-7.551-15.983-.308-8.923 6.769-16l190.044-190.044q4.494-4.494 9.353-6.686t10.807-2.192q5.949 0 10.757 2.192 4.807 2.192 9.314 6.699l190.416 189.416q6.692 6.095 6.692 15.508 0 9.414-6.91 16.123-7.244 7.06-16.474 7.06-9.231 0-16.307-7.077L480-552.616 302.077-374.078q-5.996 6.693-15.267 6.193-9.271-.5-16.181-7.209Z' />
    </svg>
  )
}

export default SimpleArrowUp
