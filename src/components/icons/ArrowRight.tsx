import React from 'react'

interface Props {
  width?: number
  height?: number
}

const ArrowRight = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      height={width}
      width={height}
      fill='currentColor'
      viewBox='0 -960 960 960'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M546.539-271.078q-6.692-7.076-6.885-16.307-.192-9.23 6.27-15.307L701.77-458.924H194.616q-9.904 0-16.298-6.398-6.394-6.397-6.394-16.307 0-9.909 6.394-16.294 6.394-6.384 16.298-6.384H701.77L544.924-661.154q-6.693-6.589-6.385-15.564.308-8.974 7.385-15.666 7.076-6.461 16.307-6.461 9.23 0 15.692 6.461l190.538 190.538q4.615 5 6.807 9.859 2.193 4.859 2.193 10.423 0 5.949-2.193 10.756-2.192 4.808-6.807 9.423L578.154-271.078q-6.5 7.077-15.519 6.885-9.019-.192-16.096-6.885Z' />
    </svg>
  )
}

export default ArrowRight
