import { cls } from '@/utils'
import { Photo } from '../icons'

const BeforeImageGenerated = () => {
  return (
    <p className={cls('flex flex-col items-center justify-center gap-8', 'text-grayscale-600/80')}>
      <Photo width={100} height={100} />
      <span className='text-[32px] text-center text-grayscale-600/100 text-shadow-white'>
        Your image will show up here
      </span>
    </p>
  )
}

export default BeforeImageGenerated
