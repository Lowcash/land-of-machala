'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { ItemDetailView } from './Detail/ItemDetailView'
import type { InventoryItemUI } from './Shared/types'

interface ItemDetailWrapperProps {
  item: InventoryItemUI | null
  characterId: string
}

export function ItemDetailWrapper({ item, characterId }: ItemDetailWrapperProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('itemId')
    router.push(`?${params.toString()}`)
  }

  return <ItemDetailView item={item} onClose={handleClose} characterId={characterId} />
}
