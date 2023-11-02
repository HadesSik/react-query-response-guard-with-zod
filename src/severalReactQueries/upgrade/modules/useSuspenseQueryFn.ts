import {
  DefaultError,
  QueryClient,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from '@tanstack/react-query'
import API from '../../../modules/API'

function useSuspenseQueryFn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  method: keyof typeof API,
  options: Omit<
    UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryFn' | 'queryKey'
  > & {
    queryKey?: TQueryKey
    endPoint: string
  },
  queryClient?: QueryClient
): UseSuspenseQueryResult<TData, TError> {
  return useSuspenseQuery(
    {
      queryKey: options.queryKey || [options.endPoint],
      queryFn: () => API[method](options.endPoint).then((res) => res.data),
    },
    queryClient
  )
}

export default useSuspenseQueryFn
