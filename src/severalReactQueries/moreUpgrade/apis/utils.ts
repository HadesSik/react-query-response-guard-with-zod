const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

type TBuildUrlParams = {
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
