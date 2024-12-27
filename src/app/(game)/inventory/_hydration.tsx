import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import * as InventoryAction from '@/server/actions/inventory'

import { QUERY_KEY } from '@/const'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  void (await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.INVENTORY],
      queryFn: () => InventoryAction.show(),
    }),
  ]))

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
