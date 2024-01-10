import { cls } from '@/utils'

const Footer = () => {
  return (
    <footer className={cls('bg-grayscale-50 text-grayscale-300', 'px-10 py-12', 'text-[14px]')}>
      <div className='md:max-w-[1000px] mx-auto desktop:max-w-[1280px]'>
        <p className='text-[16px] text-grayscale-400 mb-4 xl:mb-2'>© ALTAVA Group</p>
        <div className='flex flex-col gap-1 xl:gap-0'>
          <p className=''>Business Registration Number: 791-81-01439</p>
          <p>Telecommunication Sales Report No. 2022-Seoul Gangnam-05319</p>
          <address className='not-italic'>503, 1410ho, Teheran-ro, Gangnam-gu, Seoul</address>
          <p>Customer Service: 02-3442-2121</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
