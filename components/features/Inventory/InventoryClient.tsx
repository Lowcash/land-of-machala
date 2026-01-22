'use client'

import { MobileOverlay, PageTemplate, SplitView } from '@/components/layout'
import { equipItemAction, unequipItemAction, useItemAction } from '@/lib/actions/inventory'
import { Backpack } from 'lucide-react'
import { useEffect, useOptimistic, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { ItemDetailView } from './Detail/ItemDetailView'
import { InventoryGrid } from './Grid/InventoryGrid'
import { sortInventory } from './Shared/inventoryUtils'
import type { InventoryItemUI } from './Shared/types'

type InventoryClientProps = {
  initialInventory: InventoryItemUI[]
}

export function InventoryClient({ initialInventory }: InventoryClientProps) {
  // Use optimistic state for immediate UI updates
  const [optimisticInventory, addOptimisticAction] = useOptimistic(
    initialInventory,
    (state, action: { type: 'USE' | 'EQUIP' | 'UNEQUIP'; itemId: string }) => {
      switch (action.type) {
        case 'USE':
          return state
            .map((item) =>
              item.id === action.itemId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
        case 'EQUIP':
          return state.map((item) => {
            const itemToEquip = state.find((i) => i.id === action.itemId)
            if (item.id === action.itemId) return { ...item, equipped: true }
            if (itemToEquip && item.type === itemToEquip.type && item.id !== action.itemId) {
              return { ...item, equipped: false }
            }
            return item
          })
        case 'UNEQUIP':
          return state.map((item) =>
            item.id === action.itemId ? { ...item, equipped: false } : item
          )
        default:
          return state
      }
    }
  )

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const itemId = params.get('itemId')
      if (itemId && optimisticInventory.find((i) => i.id === itemId)) {
        setSelectedItemId(itemId)
      } else {
        setSelectedItemId(null)
      }
    }

    handlePopState()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [optimisticInventory])

  const handleSelectItem = (id: string | null) => {
    if (id) {
      setSelectedItemId(id)
      window.history.pushState({ itemId: id }, '', `?itemId=${id}`)
    } else {
      setSelectedItemId(null)
      const url = new URL(window.location.href)
      url.searchParams.delete('itemId')
      window.history.pushState({}, '', url.toString())
    }
  }

  const handleBack = () => {
    window.history.back()
  }

  const handleEquip = async (id: string) => {
    startTransition(async () => {
      addOptimisticAction({ type: 'EQUIP', itemId: id })
      const [result, err] = await equipItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při nasazování předmětu')
        return
      }
      if (result?.success) {
        toast.success('Předmět nasazen')
      }
    })
  }

  const handleUnequip = async (id: string) => {
    startTransition(async () => {
      addOptimisticAction({ type: 'UNEQUIP', itemId: id })
      const [success, err] = await unequipItemAction({ inventoryItemId: id })
      if (err) {
        toast.error('Chyba při sundávání předmětu')
        return
      }
      if (success) {
        toast.success('Předmět sundán')
      }
    })
  }

  const handleUse = async (id: string) => {
    startTransition(async () => {
      addOptimisticAction({ type: 'USE', itemId: id })
      const [result] = await useItemAction({ inventoryItemId: id })

      if (!result) {
        toast.error('Chyba při použití předmětu')
        return
      }
      toast.success('Předmět použit')
    })
  }

  const sortedInventory = sortInventory(optimisticInventory)
  const selectedItemData = sortedInventory.find((i) => i.id === selectedItemId)

  // Empty state for desktop sidebar
  const emptyState = (
    <div className="flex h-full w-full items-center justify-center">
      <div className="px-4 text-center">
        <Backpack className="mx-auto mb-4 h-16 w-16 text-[#8b6f47]" />
        <h3 className="mb-2 text-lg text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Vyber předmět
        </h3>
        <p className="text-sm leading-relaxed text-[#8b7355]">
          Klikni na předmět v inventáři pro zobrazení detailů a akcí.
        </p>
      </div>
    </div>
  )

  return (
    <PageTemplate
      title="Inventář"
      backLink={{ href: '/game', label: 'Zpět do hry' }}
      icon={<Backpack className="h-6 w-6" />}
    >
      <SplitView
        main={
          <InventoryGrid
            inventory={sortedInventory}
            selectedItem={selectedItemId}
            onSelectItem={handleSelectItem}
          />
        }
        aside={
          selectedItemData ? (
            <div className="h-full p-6">
              <ItemDetailView
                item={selectedItemData}
                isPending={isPending}
                onUse={handleUse}
                onEquip={handleEquip}
                onUnequip={handleUnequip}
              />
            </div>
          ) : (
            emptyState
          )
        }
        asideWidth="md"
      />

      <MobileOverlay
        isOpen={!!selectedItemData}
        title={selectedItemData?.name || 'Detail předmětu'}
        onClose={handleBack}
        backText="Zpět do inventáře"
      >
        {selectedItemData && (
          <ItemDetailView
            item={selectedItemData}
            isPending={isPending}
            onUse={handleUse}
            onEquip={handleEquip}
            onUnequip={handleUnequip}
          />
        )}
      </MobileOverlay>
    </PageTemplate>
  )
}
