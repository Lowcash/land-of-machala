import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import * as PlayerAction from '@/app/actions/player'
import * as StatsAction from '@/app/actions/stats'
import * as WearableAction from '@/app/actions/wearable'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.PLAYER],
      action: PlayerAction.get,
    },
    {
      queryKey: [QUERY_KEY.STATS],
      action: StatsAction.get,
    },
    {
      queryKey: [QUERY_KEY.WEARABLE],
      action: WearableAction.get,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
