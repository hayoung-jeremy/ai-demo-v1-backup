import React from 'react'

interface Props {
  width?: number
  height?: number
}

const Delete = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      height={width}
      width={height}
      fill='currentColor'
      viewBox='0 -960 960 960'
      xmlns='http://www.w3.org/2000/svg'>
      <path d='M278.309-140.001q-23.529 0-40.611-17.082-17.081-17.082-17.081-40.611v-544.228h-17.924q-9.663 0-16.177-6.567-6.515-6.567-6.515-16.307 0-9.741 6.515-16.126 6.514-6.384 16.177-6.384h148.384q0-12.231 8.438-20.154 8.437-7.923 20.408-7.923h200.154q11.971 0 20.408 8.053 8.438 8.053 8.438 20.024h148.384q9.663 0 16.177 6.567 6.515 6.566 6.515 16.307t-6.515 16.125q-6.514 6.385-16.177 6.385h-17.924v544.228q0 23.529-17.081 40.611-17.082 17.082-40.611 17.082H278.309ZM266-741.922v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462h403.382q5 0 8.655-3.462 3.654-3.462 3.654-8.847v-544.228H266Zm115.232 449.384q0 9.663 6.566 16.177 6.567 6.515 16.308 6.515 9.74 0 16.125-6.515 6.384-6.514 6.384-16.177v-343.231q0-9.288-6.566-15.99-6.567-6.702-16.308-6.702-9.74 0-16.125 6.702-6.384 6.702-6.384 15.99v343.231Zm152.153 0q0 9.663 6.566 16.177 6.567 6.515 16.308 6.515 9.74 0 16.125-6.515 6.384-6.514 6.384-16.177v-343.231q0-9.288-6.566-15.99-6.567-6.702-16.308-6.702-9.74 0-16.125 6.702-6.384 6.702-6.384 15.99v343.231ZM266-741.922v544.228q0 5.385 3.654 8.847 3.655 3.462 8.655 3.462H266V-741.922Z' />
    </svg>
  )
}

export default Delete
