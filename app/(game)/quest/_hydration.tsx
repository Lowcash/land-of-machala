import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import * as QuestAction from '@/app/actions/quest'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.QUEST_ASSIGNED],
      action: QuestAction.getAssigned,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
