'use client'

import { useInventoryActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'

interface InventoryItemActionsProps {
  itemId: string
  isEquipped: boolean
  isConsumable: boolean
}

export function InventoryItemActions({
  itemId,
  isEquipped,
  isConsumable,
}: InventoryItemActionsProps) {
  // 1. Hooks
  const { handleEquip, handleUnequip, handleConsume, handleSell, isPending } = useInventoryActions()

  // 2. Navigation State / Derived Values - None currently

  // 3. Handlers
  const handleAction = async () => {
    if (isConsumable) {
      handleConsume(itemId)
    } else if (isEquipped) {
      handleUnequip(itemId)
    } else {
      handleEquip(itemId)
    }
  }

  // 4. Sub-components (Render helpers)
  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleAction}
        disabled={isPending}
        variant={isEquipped ? 'game-danger' : 'game-primary'}
        className="w-full"
      >
        {isConsumable ? 'Použít předmět' : isEquipped ? 'Sundat výbavu' : 'Nasadit výbavu'}
      </Button>

      <Button
        onClick={() => handleSell(itemId)}
        disabled={isPending || isEquipped}
        variant="ghost"
        className="text-game-danger hover:bg-game-danger/10 w-full text-xs"
      >
        Prodat (Market)
      </Button>
    </div>
  )
}
