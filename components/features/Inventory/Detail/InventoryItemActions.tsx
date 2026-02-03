'use client'

import { useInventoryActions } from '@/lib/hooks/game'

import { Button } from '@/components/ui/button'
import { VStack } from '@/components/ui/stack'

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
    <VStack gap="sm" fullWidth>
      <Button
        onClick={handleAction}
        disabled={isPending}
        variant={isEquipped ? 'danger' : 'primary'}
        fullWidth
        label={isConsumable ? 'Použít předmět' : isEquipped ? 'Sundat výbavu' : 'Nasadit výbavu'}
      />

      <Button
        onClick={() => handleSell(itemId)}
        disabled={isPending || isEquipped}
        variant="danger"
        size="xs"
        fullWidth
        label="Prodat (Market)"
      />
    </VStack>
  )
}
