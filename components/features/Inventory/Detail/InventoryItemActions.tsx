'use client'

import { useTransition } from 'react'

import { toast } from 'sonner'

import { consumeItemAction, equipItemAction, unequipItemAction } from '@/lib/actions/inventory'

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
  const [isPending, startTransition] = useTransition()

  const handleAction = async () => {
    startTransition(async () => {
      try {
        let result
        if (isConsumable) {
          result = await consumeItemAction({ inventoryItemId: itemId })
        } else if (isEquipped) {
          result = await unequipItemAction({ inventoryItemId: itemId })
        } else {
          result = await equipItemAction({ inventoryItemId: itemId })
        }

        const [data, err] = result

        if (err) {
          toast.error('Akce selhala')
          return
        }

        if (data?.success) {
          toast.success(
            isConsumable ? 'Předmět použit' : isEquipped ? 'Předmět sundán' : 'Předmět nasazen'
          )
        }
      } catch {
        toast.error('Chyba při akci')
      }
    })
  }

  return (
    <Button
      onClick={handleAction}
      disabled={isPending}
      variant={isEquipped ? 'game-danger' : 'game-primary'}
      className="w-full"
    >
      {isConsumable ? 'Použít předmět' : isEquipped ? 'Sundat výbavu' : 'Nasadit výbavu'}
    </Button>
  )
}
