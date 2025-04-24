import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import * as PlayerAction from '@/app/actions/player'
import * as ClassAction from '@/app/actions/class'
import * as RaceAction from '@/app/actions/race'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.CREATE],
      action: PlayerAction.showCreate,
    },
    {
      queryKey: [QUERY_KEY.CLASS],
      action: ClassAction.show,
    },
    {
      queryKey: [QUERY_KEY.RACE],
      action: RaceAction.show,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
