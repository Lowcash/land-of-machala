import { cache } from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchPlayerQuery } from '@/data/player-server'

const getQueeryClient = cache(() => new QueryClient())

export default async function Hydration({ children }: React.PropsWithChildren) {
  const queryClient = getQueeryClient()

  await prefetchPlayerQuery(queryClient)

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
