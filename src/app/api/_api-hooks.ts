import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export function createQueryHook<T extends (...args: any) => any>(queryKey: string[], queryFn: T) {
  return (
    params: Parameters<T>[0],
    options?: UseQueryOptions<Awaited<ReturnType<T>>, Error, Awaited<ReturnType<T>>, any[]>,
  ) => {
    return useQuery({
      ...options,
      queryKey,
      queryFn: () => queryFn(params),
    })
  }
}

export function createMutationHook<T extends (...args: any) => any>(
  mutationFn: T,
  invalidateQueriesWhenSuccess?: string[],
) {
  return (options?: UseMutationOptions<Awaited<ReturnType<T>>, Error, Parameters<T>[0]>) => {
    const queryClient = useQueryClient()

    return useMutation({
      ...options,
      onSuccess: (data, variables, context) => {
        if (!invalidateQueriesWhenSuccess) return

        queryClient.invalidateQueries({
          predicate: (p) => invalidateQueriesWhenSuccess.some((key) => p.queryKey[0] === key),
        })

        options?.onSuccess?.(data, variables, context)
      },
      mutationFn,
    })
  }
}
