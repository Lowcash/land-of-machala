import { QueryClient } from '@tanstack/react-query'
import { getPlayer } from '@/server/actions/player'

import { QUERY_KEY } from '@/const'

export async function prefetchPlayerQuery(query: QueryClient) {
  return query.prefetchQuery({
    queryKey: [QUERY_KEY.PLAYER],
    queryFn: () => getPlayer(),
  })
}
