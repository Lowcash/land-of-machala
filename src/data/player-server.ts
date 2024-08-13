import { QueryClient } from '@tanstack/react-query'
import { getPlayer } from '@/server/actions/player'

import { PLAYER_KEY } from './player'

export async function prefetchPlayerQuery(query: QueryClient) {
  return query.prefetchQuery({
    queryKey: [PLAYER_KEY],
    queryFn: () => getPlayer(),
  })
}
