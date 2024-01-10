import React from 'react'

interface Props {
  width?: number
  height?: number
}

const SimpleArrowDown = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      height={width}
      width={height}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'>
      <path d='M480-370.078q-5.615 0-10.615-2t-9.616-6.615L269.847-568.616q-6.077-6.077-5.769-16.307.307-10.231 6.384-16.307 7.692-7.692 16.307-6.769 8.616.923 15.692 7.384L480-423.076l177.539-177.539q6.076-6.077 16.115-6.884 10.038-.808 16.499 6.884 7.692 6.461 6.577 16-1.115 9.538-7.192 16.615L500.231-378.693q-4.616 4.615-9.423 6.615-4.808 2-10.808 2Z' />
    </svg>
  )
}

export default SimpleArrowDown
