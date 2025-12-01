import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import { showCreate as PlayerShowCreate } from '@/app/actions/player'
import { show as ClassShow } from '@/app/actions/class'
import { show as RaceShow } from '@/app/actions/race'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.CREATE],
      action: PlayerShowCreate,
    },
    {
      queryKey: [QUERY_KEY.CLASS],
      action: ClassShow,
    },
    {
      queryKey: [QUERY_KEY.RACE],
      action: RaceShow,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
