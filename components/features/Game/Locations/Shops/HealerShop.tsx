'use client'

import { HEALER_SHOP_CONFIG, HEALER_SHOP_ITEMS } from '@/lib/game/constants/shops'
import { useShopActions } from '@/lib/hooks/game'
import type { Buff } from '@/lib/types/game'
import type { ShopItem } from '@/lib/types/shop'

import { GenericShopDisplay } from '../../Shared/Shop/GenericShopDisplay'
import { HealerBuffs } from './HealerBuffs'

interface HealerShopProps {
  activeBuffs: Buff[]
  gold: number
}

export function HealerShop({ activeBuffs, gold }: HealerShopProps) {
  // 1. Hooks
  const { handlePurchaseService } = useShopActions()

  // 3. Handlers
  const getServiceAction = (item: ShopItem) => () => handlePurchaseService(item.id.toString())

  return (
    <GenericShopDisplay
      config={HEALER_SHOP_CONFIG}
      items={HEALER_SHOP_ITEMS}
      gold={gold}
      getItemAction={getServiceAction}
    >
      <HealerBuffs activeBuffs={activeBuffs} />
    </GenericShopDisplay>
  )
}
