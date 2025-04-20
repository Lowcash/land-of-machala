import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import * as QuestAction from '@/app/actions/quest'
import * as CommonAction from '@/app/actions/common'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.QUEST_ASSIGNED],
      action: QuestAction.showAssigned,
    },
    {
      queryKey: [QUERY_KEY.COMMON],
      action: CommonAction.show,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
