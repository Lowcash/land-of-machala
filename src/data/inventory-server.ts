import { QueryClient } from '@tanstack/react-query'
import { showInventory } from '@/server/actions/inventory'

import { QUERY_KEY } from '@/const'

export async function prefetchShowInventoryQuery(query: QueryClient) {
  return query.prefetchQuery({
    queryKey: [QUERY_KEY.INVENTORY],
    queryFn: () => showInventory(),
  })
}
