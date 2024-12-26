import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import * as GameAction from '@/server/actions/game'

import { QUERY_KEY } from '@/const'

export default async function Hydration(p: React.PropsWithChildren) {
  const queryClient = new QueryClient()

  void (await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.INFO],
      queryFn: () => GameAction.getInfo(),
    }),
  ]))

  return <HydrationBoundary state={dehydrate(queryClient)}>{p.children}</HydrationBoundary>
}
