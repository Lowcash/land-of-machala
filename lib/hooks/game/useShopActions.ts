'use client'

import { buyItemAction, purchaseServiceAction } from '@/lib/actions/shop'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'
import type { ShopItem } from '@/lib/types/shop'

export function useShopActions() {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleBuyItem = (item: ShopItem, shopType: 'smith' | 'market' | 'black_market') => {
    return execute(() =>
      buyItemAction({
        itemName: item.name,
        price: item.price,
        shopType,
      })
    )
  }

  const handlePurchaseService = (serviceId: string) => {
    return execute(() =>
      purchaseServiceAction({
        serviceId,
      })
    )
  }

  return {
    isPending,
    handleBuyItem,
    handlePurchaseService,
  }
}
