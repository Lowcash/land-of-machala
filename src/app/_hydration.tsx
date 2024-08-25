import { cache } from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchPlayerQuery } from '@/data/player-server'
import { prefetchShowInventoryQuery } from '@/data/inventory-server'

const getQueryClient = cache(() => new QueryClient())

export default async function Hydration({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient()

  await prefetchPlayerQuery(queryClient)
  await prefetchShowInventoryQuery(queryClient)

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
