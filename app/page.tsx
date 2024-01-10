'use client'
import { useRecoilValue } from 'recoil'
import { uploadedImgState, generatedImgState, imgGeneratingState } from '@/store/generate'

import { Section } from '@/components/layout'

export default function Home() {
  const uploadedImage = useRecoilValue(uploadedImgState)
  const generatedImage = useRecoilValue(generatedImgState)
  const isImgGenerating = useRecoilValue(imgGeneratingState)

  return (
    <>
      <Section sectionTitle='Main Banner'>
        hi
        <button className='flex items-center justify-center bg-primary px-4 py-1 rounded-md text-white'>
          Click
        </button>
      </Section>
      <Section sectionTitle='Description'>hi</Section>
    </>
  )
}
