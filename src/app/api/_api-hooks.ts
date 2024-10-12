import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'

export function createQueryHook<T extends (...args: any) => any>(queryKey: string[], queryFn: T) {
  return (
    params: Parameters<T>[0],
    options?: UseQueryOptions<Awaited<ReturnType<T>>, Error, Awaited<ReturnType<T>>, any[]>
  ) => {
    return useQuery({
      ...options,
      queryKey,
      queryFn: () => queryFn(params),
    })
  }
}

export function createMutationHook<T extends (...args: any) => any>(mutationFn: T) {
  return (options?: UseMutationOptions<Awaited<ReturnType<T>>, Error, Parameters<T>[0]>) => {
    return useMutation({
      ...options,
      mutationFn,
    })
  }
}
