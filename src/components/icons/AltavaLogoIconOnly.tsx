import React from 'react'

interface Props {
  width?: number
  height?: number
}

const AltavaLogoIconOnly = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      fill='currentColor'
      id='Layer_1'
      version='1.1'
      viewBox='0 0 562.37 562.37'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      xmlSpace='preserve'>
      <path
        d='M115.99,513.16c-38.66-2.34-64.44-28.12-66.78-66.78C37.49,215.57,215.57,37.49,446.38,49.21&#xA;&#x9;c38.66,2.34,64.44,28.12,66.78,66.78C524.87,346.79,346.79,524.87,115.99,513.16z M133.56,562.37H428.8&#xA;&#x9;c82.01,0,133.56-51.55,133.56-133.56V133.56C562.37,51.55,510.82,0,428.8,0H133.56C51.55,0,0,51.55,0,133.56V428.8&#xA;&#x9;C0,510.82,51.55,562.37,133.56,562.37z'
      />
    </svg>
  )
}

export default AltavaLogoIconOnly
