'use client'

import {
  consumeItemAction,
  equipItemAction,
  sellItemAction,
  unequipItemAction,
} from '@/lib/actions/inventory'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

export function useInventoryActions() {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleEquip = (itemId: string) => {
    execute(() => equipItemAction({ inventoryItemId: itemId }))
  }

  const handleUnequip = (itemId: string) => {
    execute(() => unequipItemAction({ inventoryItemId: itemId }))
  }

  const handleConsume = (itemId: string) => {
    execute(() => consumeItemAction({ inventoryItemId: itemId }))
  }

  const handleSell = (itemId: string) => {
    execute(() => sellItemAction({ inventoryItemId: itemId }))
  }

  return {
    isPending,
    handleEquip,
    handleUnequip,
    handleConsume,
    handleSell,
  }
}
