import React from 'react'
import { cls } from '@/utils'
import { creationMethodList } from '@/constants'

interface Props {
  currentMethodIdx: number
}

const CreationMethodIndicator = ({ currentMethodIdx }: Props) => {
  return (
    <div className={cls('absolute bottom-0 left-0 w-full')}>
      <ul className='w-full flex items-center justify-center gap-1 relative py-4'>
        {creationMethodList.map((_, index) => {
          return (
            <li
              key={index}
              className={cls(
                'flex items-center justify-center',
                'rounded-full',
                'transition-all duration-200',
                currentMethodIdx === index
                  ? 'w-2 h-2 bg-grayscale-200 shadow-[0px_0px_8px_4px] shadow-primary/20'
                  : 'w-[6px] h-[6px] bg-grayscale-100'
              )}></li>
          )
        })}
      </ul>
    </div>
  )
}

export default CreationMethodIndicator
