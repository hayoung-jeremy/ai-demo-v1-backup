import React from 'react'

interface Props {
  width?: number
  height?: number
}

const Add = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      height={width}
      width={height}
      fill='currentColor'
      viewBox='0 -960 960 960'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M479.804-210.001q-9.727 0-16.111-6.524-6.385-6.523-6.385-16.168v-224.615H232.693q-9.645 0-16.168-6.58-6.524-6.581-6.524-16.308t6.524-16.111q6.523-6.385 16.168-6.385h224.615v-224.615q0-9.644 6.58-16.168 6.581-6.524 16.308-6.524t16.111 6.524q6.385 6.524 6.385 16.168v224.615h224.615q9.644 0 16.168 6.58 6.524 6.581 6.524 16.308t-6.524 16.111q-6.524 6.385-16.168 6.385H502.692v224.615q0 9.645-6.58 16.168-6.581 6.524-16.308 6.524Z' />
    </svg>
  )
}

export default Add
