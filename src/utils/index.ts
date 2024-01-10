import { generatedImgState } from '@/store/generate'
import axios from 'axios'
import { useRecoilValue } from 'recoil'

export function cls(...classnames: string[]) {
  return classnames.join(' ')
}
