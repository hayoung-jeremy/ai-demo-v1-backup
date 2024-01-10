'use client'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRecoilState, useRecoilValue } from 'recoil'
import { imgGeneratingState, uploadedImgState } from '@/store/generate'
import { cls } from '@/utils'

import { Add, Delete, Error, Upload } from '../icons'
import SpinningLoader from '../SpinningLoader'

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useRecoilState(uploadedImgState)
  const [uploadingErr, setUploadingErr] = useState<any>(null)
  const isImgGenerating = useRecoilValue(imgGeneratingState)

  const onDrop = useCallback(
    (acceptedFiles: any, fileRejections: any) => {
      if (fileRejections.length) {
        fileRejections.forEach((file: { errors: any[] }) => {
          file.errors.forEach((err) => {
            if (err.code === 'file-too-large')
              return setUploadingErr('File is larger than 4mb. Please try smaller')
            if (err.code === 'file-invalid-type')
              return setUploadingErr('File type must be .png, .jpg, or .jpeg')
            if (err.code === 'too-many-files')
              return setUploadingErr('You can only upload a single file at once')
            else setUploadingErr(err.message)
          })
        })
        return
      }
      // Do something with the files
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onloadend = () => {
        const base64data = reader.result as string
        setUploadedImage(base64data)
      }
      setUploadingErr(null)
    },
    [setUploadedImage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 1048576 * 4,
    multiple: false,
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
  })

  return (
    <div className={cls('relative', 'w-full h-full overflow-hidden')}>
      {uploadedImage ? (
        <>
          <Image src={uploadedImage} alt='Uploaded Image' fill style={{ objectFit: 'contain' }} />
          <button
            onClick={() => setUploadedImage(null)}
            className={cls(
              'absolute bottom-0 right-0 z-10',
              'flex items-center justify-center',
              'w-12 h-12',
              'text-grayscale-200 hover:text-negative',
              'transition-all duration-200'
            )}>
            <Delete width={28} height={28} />
          </button>
        </>
      ) : (
        <div
          {...getRootProps()}
          className={cls('flex flex-col items-center justify-center gap-3', 'h-full')}>
          <input
            {...getInputProps()}
            className='outline-none ring-0 focus:ring-0 focus:outline-none active:outline-none'
          />
          {isDragActive ? (
            <div className='text-grayscale-600 flex flex-col items-center justify-center gap-2'>
              <Add width={40} height={40} />
              <p>Drop the files here ...</p>
            </div>
          ) : (
            <div
              className={cls(
                'flex flex-col items-center justify-center gap-2',
                'w-[65%] aspect-square',
                'p-5',
                'border border-dashed border-grayscale-100 hover:border-grayscale-200',
                'rounded-s',
                uploadingErr ? 'text-negative' : 'text-grayscale-200 hover:text-grayscale-400',
                'cursor-pointer'
              )}>
              {uploadingErr ? (
                <>
                  <Error />
                  <p className=' text-center'>{uploadingErr}</p>
                </>
              ) : (
                <>
                  {' '}
                  <Upload width={40} height={40} />
                  <p className='text-center'>
                    Drag & drop a file here, <br /> or click to select one
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {isImgGenerating && (
        <div
          className={cls(
            'absolute top-0 left-0 z-10',
            'w-full h-full bg-black/60',
            'flex items-center justify-center'
          )}>
          <SpinningLoader width={36} height={36} />
        </div>
      )}
    </div>
  )
}

export default ImageUploader
