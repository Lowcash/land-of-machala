import { resolveActionResult, type SafeActionResultData } from '@/lib/safe-action-client-utils'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'

export function createQueryHook<T extends (...args: any) => any>(queryKey: string[], queryFn: T) {
  return (
    params?: Parameters<T>[0],
    options?: UseQueryOptions<SafeActionResultData<T>, Error, SafeActionResultData<T>, any[]>,
  ) => {
    return useQuery({
      ...options,
      queryKey,
      queryFn: () => resolveActionResult(queryFn(params)),
    })
  }
}

export function createMutationHook<T extends (...args: any) => any>(
  mutationFn: T,
  invalidateQueriesWhenSuccess?: string[],
) {
  return (options?: UseMutationOptions<SafeActionResultData<T>, Error, Parameters<T>[0]>) => {
    const queryClient = useQueryClient()

    return useMutation({
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context)

        if (!invalidateQueriesWhenSuccess) return

        queryClient.invalidateQueries({
          predicate: (p) => invalidateQueriesWhenSuccess.some((key) => p.queryKey[0] === key),
        })
      },
      mutationFn: (variables) => resolveActionResult(mutationFn(variables)),
    })
  }
}
