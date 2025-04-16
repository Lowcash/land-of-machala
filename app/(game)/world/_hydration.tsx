import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import * as GameAction from '@/app/actions/game'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.GAME_INFO],
      action: GameAction.info,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
