import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createSafeQueryClient } from '@/lib/query'

import * as InventoryAction from '@/app/actions/inventory'

import { QUERY_KEY } from '@/config'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = await createSafeQueryClient().prefetch([
    {
      queryKey: [QUERY_KEY.INVENTORY],
      action: InventoryAction.show,
    },
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
