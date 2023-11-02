import {
  DefaultError,
  QueryClient,
  QueryFunction,
  QueryKey,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from '@tanstack/react-query'

const useSuspenseQueryFn =
  <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: QueryFunction<any, TQueryKey, never>
  ) =>
  (
    options: Omit<
      UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'queryFn'
    >,
    queryClient?: QueryClient
  ): UseSuspenseQueryResult<TData, TError> => {
    return useSuspenseQuery(
      {
        ...options,
        queryFn,
      },
      queryClient
    )
  }

export default useSuspenseQueryFn
