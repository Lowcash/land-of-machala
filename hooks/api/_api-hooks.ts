import { resolveActionResult, type SafeActionResultData } from '@/lib/safe-action-client-utils'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic query function type
export function createQueryHook<T extends (...args: any) => any>(queryKey: string[], queryFn: T) {
  return (
    params?: Parameters<T>[0],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TanStack Query requires any[] for queryKey type
    options?: UseQueryOptions<SafeActionResultData<T>, Error, SafeActionResultData<T>, any[]>,
  ) => {
    return useQuery({
      ...options,
      queryKey,
      queryFn: () => resolveActionResult(queryFn(params)),
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic mutation function type
export function createMutationHook<T extends (...args: any) => any>(
  mutationFn: T,
  invalidateQueriesWhenSuccess?: string[],
) {
  return (options?: UseMutationOptions<SafeActionResultData<T>, Error, Parameters<T>[0], unknown>) => {
    const queryClient = useQueryClient()

    return useMutation({
      ...options,
      onSuccess: () => {
        if (!invalidateQueriesWhenSuccess) return

        queryClient.invalidateQueries({
          predicate: (p) => invalidateQueriesWhenSuccess.some((key) => p.queryKey[0] === key),
        })
      },
      mutationFn: (variables) => resolveActionResult(mutationFn(variables)),
    })
  }
}
