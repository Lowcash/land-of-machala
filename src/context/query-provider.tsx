'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function QueryProvider(p: React.PropsWithChildren) {
  const [queryClient] = React.useState(new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {p.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
