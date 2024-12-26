import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import * as PlayerAction from '@/server/actions/player'
import * as StatsAction from '@/server/actions/stats'
import * as WearableAction from '@/server/actions/wearable'

import { QUERY_KEY } from '@/const'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  void (await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.PLAYER],
      queryFn: () => PlayerAction.get(),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.STATS],
      queryFn: () => StatsAction.get(),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.WEARABLE],
      queryFn: () => WearableAction.get(),
    }),
  ]))

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
