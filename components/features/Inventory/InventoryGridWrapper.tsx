'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { InventoryGrid } from './Grid/InventoryGrid'
import type { InventoryItemUI } from './Shared/types'

interface InventoryGridWrapperProps {
  inventory: InventoryItemUI[]
  selectedItem: string | null
}

export function InventoryGridWrapper({ inventory, selectedItem }: InventoryGridWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelectItem = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (id) {
      params.set('itemId', id)
    } else {
      params.delete('itemId')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <InventoryGrid
      inventory={inventory}
      selectedItem={selectedItem}
      onSelectItem={handleSelectItem}
    />
  )
}
