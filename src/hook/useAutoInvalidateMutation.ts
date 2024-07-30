import { useMutation, useQueryClient, UseMutationOptions, type UseMutationResult } from '@tanstack/react-query'

export function useAutoInvalidateMutation<TData, TError, TVariables, TContext>(
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    onSuccess: async (data, variables, context) => {
      // const visibleQueries = queryClient
      //   .getQueryCache()
      //   .findAll()
      //   .filter((query) => query.isActive())

      // visibleQueries.forEach((query) => {
      //   queryClient.invalidateQueries({ queryKey: query.queryKey })
      // })

      queryClient.invalidateQueries()
      
      options?.onSuccess?.(data, variables, context)
    },
  })
}
