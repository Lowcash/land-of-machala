'use client'

import { createQueryClient } from '@/server/query'
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function QueryProvider(p: React.PropsWithChildren) {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
}
