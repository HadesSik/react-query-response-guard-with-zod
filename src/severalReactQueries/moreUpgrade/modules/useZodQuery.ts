import {
  DefaultError,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from '@tanstack/react-query'
import API from '../../../modules/API'
import { ZodType, output } from 'zod'
import {
  TBuildUrlParams,
  apiWithAxios,
  buildUrlWithBase,
  zodGuard,
} from '../apis/utils'

export type TUseZodQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn' | 'queryKey'
> & {
  queryKey?: TQueryKey
}

/**
 *
 * @param zodSchema : zod를 사용한 schema를 전달합니다.
 * @param method : API의 method를 전달합니다.
 * @param urlParams : endpoint와 query를 전달합니다.
 * @param options : useSuspenseQuery의 options를 전달합니다.
 * @returns zodSchema를 통과한 data를 반환합니다.
 */
function useZodQuery<
  T extends ZodType,
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey,
>(
  zodSchema: T,
  method: keyof typeof API,
  urlParams: TBuildUrlParams,
  options?: Omit<
    UseSuspenseQueryOptions<TQueryFnData, TError, output<T>, TQueryKey>,
    'queryFn' | 'queryKey'
  > & {
    queryKey?: TQueryKey
  }
): UseSuspenseQueryResult<output<T>, TError> {
  const url = buildUrlWithBase(urlParams)
  return useSuspenseQuery({
    queryKey: options?.queryKey || [url],
    queryFn: () => zodGuard(zodSchema)(apiWithAxios(method)(url)),
  })
}

export default useZodQuery
