import { NextResponse } from 'next/server'

const EASY_DIFFUSION_END_POINT =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:9000' // TODO: DNS 적용 후 변경
    : 'http://10.190.140.119:9000'

const MAX_RETRY_COUNT = 20 // 40 sec

const WAIT_TIME_MS = 2000

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}

type SamplerName =
  | 'plms'
  | 'ddim'
  | 'heun'
  | 'euler'
  | 'euler_a'
  | 'dpm2'
  | 'dpm2_a'
  | 'lms'
  | 'dpm_solver_stability'
  | 'dpmpp_2s_a'
  | 'dpmpp_2m'
  | 'dpmpp_sde'
  | 'dpm_fast'
  | 'dpm_adaptive'
  | 'ddpm'
  | 'deis'
  | 'unipc_snr'
  | 'unipc_tu'
  | 'unipc_snr_2'
  | 'unipc_tu_2'
  | 'unipc_tq'

type ApiBody = {
  // immutable options start
  seed: number
  use_stable_diffusion_model: string
  use_vae_model: string
  sampler_name: SamplerName
  negative_prompt: string
  guidance_scale: number
  height: number
  width: number
  num_outputs: number // 몇 장 뽑을래?
  num_inference_steps: number // 몇 번의 스텝으로 이미지를 생성할래?
  vram_usage_level: 'balanced' | 'high' | 'low'
  stream_image_progress: boolean
  stream_progress_updates: boolean
  show_only_filtered_image: boolean
  tiling: 'none'
  block_nsfw: boolean
  clip_skip: boolean
  active_tags: string[]
  inactive_tags: string[]
  metadata_output_format: string
  // immutable options end

  // generate default options start
  prompt: string
  // generate default options end

  // i2i options start
  init_image?: string // i2i 일 때 base64 img
  prompt_strength?: number // i2i 일 때 prompt의 영향력
  output_format: 'jpeg' | 'webp' | 'png'
  output_quality: number
  output_lossless?: boolean // using webp
  // i2i options end

  // inpainting options start
  preserve_init_image_color_profile: boolean // inpainting 시 true, i2i 시 false
  mask?: string // upscale 일 때 base64 img
  // inpainting options end

  hypernetwork_strength?: number
  use_hypernetwork_model?: 'SHOES_SIDE_VIEW_ALTAVA'

  // upscale options start
  upscale_amount?: '2' | '4'
  use_upscale?: 'RealESRGAN_x4plus' | 'RealESRGAN_x4plus_anime_6B' | 'Latent Upscaler 2x'
  latent_upscaler_steps?: number
  // upscale options end

  session_id?: string
}

type RequestBody = {
  prompt: string
  init_image?: string
  use_random_seed?: boolean
}

const DEFAULT_OPTIONS: ApiBody = {
  // Immutable Options Set
  seed: 42,
  use_stable_diffusion_model: 'sd-v1-4',
  use_vae_model: '',
  sampler_name: 'dpmpp_2m',
  prompt:
    'shoes, (best quality:1.3), high quality, high resolution, product shots, 8K, Canon camera, detailed',
  negative_prompt: '(worst quality, low quality:1.4), body parts, leg, legs',
  guidance_scale: 7.5,
  height: 512,
  width: 512,
  num_outputs: 1,
  num_inference_steps: 25,
  show_only_filtered_image: true, // Show only the corrected/upscaled images
  output_format: 'jpeg',
  output_quality: 100, // using webp & jpeg
  output_lossless: false, // using webp
  vram_usage_level: 'balanced',
  preserve_init_image_color_profile: false,
  stream_image_progress: false,
  stream_progress_updates: true,
  tiling: 'none',
  block_nsfw: true,
  clip_skip: false,
  active_tags: [],
  inactive_tags: [],
  metadata_output_format: 'none',
  // hypernetwork_strength: 1,
  // use_hypernetwork_model: 'SHOES_SIDE_VIEW_ALTAVA',
  upscale_amount: '4',
  use_upscale: 'RealESRGAN_x4plus',
}

class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export async function POST(request: Request) {
  try {
    const json: RequestBody = await request.json()

    // init_image가 있는데 이미지 파일의 base64 형식이 아닌 경우
    if (json.init_image && !isValidBase64Image(json.init_image)) {
      return new NextResponse(JSON.stringify({ message: 'Incorrect image format' }), {
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 랜덤 시드 여부 파악
    const seed = json.use_random_seed
      ? Math.floor(Math.random() * (2 ** 32 - 1))
      : DEFAULT_OPTIONS.seed

    // API애 보낼 body 세팅
    const temp: ApiBody = {
      ...DEFAULT_OPTIONS,
      ...json,
      seed,
      prompt: json.prompt + ', ' + DEFAULT_OPTIONS.prompt,
      prompt_strength: 0.7,
    }

    console.log('temp: ', temp) //TODO: live 시 삭제

    const body = JSON.stringify(temp)

    // render API CALL
    const callRenderAPI = await fetch(`${EASY_DIFFUSION_END_POINT}/render`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    // Error Catch callRenderAPI.status !== 200~299
    if (!callRenderAPI.ok) {
      if (callRenderAPI.status === HTTP_STATUS_CODES.SERVICE_UNAVAILABLE) {
        const { detail } = await callRenderAPI.json()
        throw new HttpError(detail, callRenderAPI.status)
      } else {
        throw new HttpError(callRenderAPI.statusText, callRenderAPI.status)
      }
    }

    const streamResult = await callRenderAPI.json()

    const url = `${EASY_DIFFUSION_END_POINT}${streamResult.stream}`

    const getNewGenerateImage = await fetchWithRetry(url, 1)

    if (getNewGenerateImage.status >= 300) {
      return new NextResponse(JSON.stringify({ message: getNewGenerateImage.data }), {
        status: getNewGenerateImage.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new NextResponse(
      JSON.stringify({ message: 'success', imageUrl: getNewGenerateImage.data }),
      {
        status: getNewGenerateImage.status,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    let message = 'An error occurred'
    let status = 500

    if (error instanceof HttpError) {
      console.log(`HTTP error! status: ${error.status}, message: ${error.message}`)
      message = error.message
      status = error.status
    } else if (error instanceof Error) {
      console.log(`An error occurred: ${error.message}`)
      message = error.message
    } else {
      console.log(error)
    }

    return new NextResponse(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

function isValidBase64Image(s: string): boolean {
  const base64ImagePattern = /^data:image\/[a-zA-Z+]+;base64,[A-Za-z0-9+/]+=*$/
  return base64ImagePattern.test(s)
}

async function fetchWithRetry(
  url: string,
  count: number
): Promise<{ status: number; data: string }> {
  console.log('call count: ', count++)

  const response = await (
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).text()

  if (response.includes('failed')) {
    return { status: HTTP_STATUS_CODES.BAD_REQUEST, data: 'Incorrect image format' }
  }

  if (count > MAX_RETRY_COUNT) {
    return { status: HTTP_STATUS_CODES.REQUEST_TIMEOUT, data: 'Exceeded maximum retry count' }
  }

  if (response.includes('data:image')) {
    const regex = /"(data:image[^"]*)"/
    const match = response.match(regex)

    if (match) {
      return { status: HTTP_STATUS_CODES.CREATED, data: match[1] }
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME_MS))
    return fetchWithRetry(url, count)
  }

  return { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, data: '' }
}
