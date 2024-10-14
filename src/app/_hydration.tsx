import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { showInventory } from '@/server/actions/inventory'
import { getPlayer } from '@/server/actions/player'
import { getInfo } from '@/server/actions/game'

import { QUERY_KEY } from '@/const'

export default async function Hydration({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  console.log('hydration')

  void (await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.PLAYER],
      queryFn: () => getPlayer(),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.INVENTORY],
      queryFn: () => showInventory(),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.INFO],
      queryFn: () => getInfo(),
    }),
  ]))

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
