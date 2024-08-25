import { useQuery } from '@tanstack/react-query'
import { showInventory } from '@/server/actions/inventory'

import { QUERY_KEY } from '@/const'

export function useShowInventoryQuery() {
  return useQuery({
    queryKey: [QUERY_KEY.INVENTORY],
    queryFn: () => showInventory(),
  })
}
