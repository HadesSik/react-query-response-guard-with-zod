import { ZodType, output } from 'zod'
import API from '../../../modules/API'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export type TBuildUrlParams = {
  endpoint: string
  query?: Record<string, unknown>
}

export const buildUrl =
  (apiBaseUrl: string | undefined = API_BASE_URL) =>
  ({ endpoint, query }: TBuildUrlParams): string => {
    const urlParams = new URLSearchParams()
    Object.entries(query || {}).forEach(([key, value]) => {
      urlParams.append(key, String(value))
    })
    return `${apiBaseUrl}/${endpoint}?${urlParams.toString()}`
  }

export const buildUrlWithBase = buildUrl()

export const apiWithAxios = (method: keyof typeof API) => (url: string) =>
  API[method](url).then((res) => res.data)

export const apiWithBase =
  (method: keyof typeof API) => (urlParams: TBuildUrlParams) =>
    API[method](buildUrlWithBase(urlParams)).then((res) => res.data)

export const zodGuard =
  <T extends ZodType>(schema: T) =>
  async (response: Promise<unknown>): Promise<Awaited<output<T>>> => {
    const data = await response
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(schema)
      const result = schema.parse(data)
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
      return data as Awaited<output<T>>
    }
  }
