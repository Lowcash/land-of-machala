import { QueryClient } from '@tanstack/react-query'
import { resolveActionResult } from '@/lib/safe-action-client-utils'

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        // staleTime: 30 * 1000,
        staleTime: 5 * 60 * 1000,
      },
    },
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic query action requires any for flexibility
type QueryAction<TParams extends any[] = [], TResult = any> = (...params: TParams) => Promise<TResult>

export function createSafeQueryClient(queryClient = new QueryClient()) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic types require any for flexibility
    async prefetch<TQueryKey extends any[], TParams extends any[] = []>(
      queries: Array<{
        queryKey: TQueryKey
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic action result type
        action: QueryAction<TParams, any>
        params?: TParams
      }>,
    ) {
      await Promise.all(
        queries.map(async (query) =>
          queryClient.prefetchQuery({
            queryKey: query.queryKey,
            queryFn: () =>
              resolveActionResult(
                // @ts-expect-error - Dynamic params spreading not fully type-safe
                query.params ? query.action(...query.params) : query.action(),
              ),
          }),
        ),
      )

      return queryClient
    },
  }
}
