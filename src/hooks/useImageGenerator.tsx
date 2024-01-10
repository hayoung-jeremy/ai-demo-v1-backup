import axios from 'axios'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  generatedImgState,
  imgGeneratingState,
  promptState,
  selectedModelState,
  uploadedImgState,
} from '@/store/generate'

const useImageGenerator = () => {
  const uploadedImage = useRecoilValue(uploadedImgState)
  const setGeneratedImage = useSetRecoilState(generatedImgState)
  const setIsImgGenerating = useSetRecoilState(imgGeneratingState)
  const prompt = useRecoilValue(promptState)
  const { modelId } = useRecoilValue(selectedModelState)

  const generateImage = async () => {
    setIsImgGenerating(true)
    try {
      const { data } = await axios.post('/api/generate', {
        init_image: uploadedImage,
        prompt,
        use_random_seed: true, // TODO: 테스트 목적으로 랜덤 시드 사용 고정으로 설정됨, 추후에 랜덤 생성 기능 구현 시 변경 필요
        use_stable_diffusion_model: modelId,
      })

      setGeneratedImage(data.imageUrl)
      setIsImgGenerating(false)
    } catch (error) {
      console.log(error)
    }
  }

  return { generateImage }
}

export default useImageGenerator
