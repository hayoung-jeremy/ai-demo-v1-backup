import { useRecoilState, useRecoilValue } from 'recoil'
import { imgGeneratingState, promptState } from '@/store/generate'
import { cls } from '@/utils'

const TextPromptInput = () => {
  const isImgGenerating = useRecoilValue(imgGeneratingState)
  const [prompt, setPrompt] = useRecoilState(promptState)

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }

  return (
    <div
      className={cls(
        'w-full',
        'px-8',
        'relative',
        'before:absolute before:w-full before:h-[20px] before:bg-gradient-to-b before:from-grayscale-800 before:top-[0px] before:left-0 before:z-[1]'
      )}>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        disabled={isImgGenerating}
        className={cls(
          'w-full min-h-[52px] max-h-[120px] py-5',
          'relative',
          'text-center',
          'bg-transparent',
          'border-b border-b-grayscale-500',
          'focus:ring-0 outline-none ring-0',
          'placeholder:text-grayscale-600',
          'disabled:cursor-not-allowed disabled:text-grayscale-500 disabled:border-b-grayscale-700'
        )}
        placeholder='Describe the image you want to generate'
      />
    </div>
  )
}

export default TextPromptInput
