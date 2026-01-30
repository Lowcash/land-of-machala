'use client'

import { Zap } from 'lucide-react'

import { HEALER_SHOP_CONFIG, HEALER_SHOP_ITEMS } from '@/lib/game/constants/shops'
import { useShopActions } from '@/lib/hooks/game'
import type { Buff } from '@/lib/types/game'
import type { ShopItem } from '@/lib/types/shop'

import { GenericShopDisplay } from '../../Shared/Shop/GenericShopDisplay'

interface HealerShopProps {
  activeBuffs: Buff[]
  gold: number
}

export function HealerShop({ activeBuffs, gold }: HealerShopProps) {
  // 1. Hooks
  const { handlePurchaseService } = useShopActions()

  // 2. Navigation State - None currently

  // 3. Handlers
  const getServiceAction = (item: ShopItem) => () => handlePurchaseService(item.id.toString())

  // 4. Sub-components (Render helpers)
  const ActiveBuffsList = () => {
    if (activeBuffs.length === 0) return null
    return (
      <div className="mb-4 rounded border border-[#ffd700]/20 bg-[#ffd700]/5 p-2">
        <div className="mb-1 text-[10px] font-bold text-[#ffd700] uppercase">Aktivní požehnání</div>
        {activeBuffs.map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] text-[#f5e6d3]">
            <Zap className="h-3 w-3 text-[#ffd700]" />
            {b.name} (+{b.val} {b.stat})
          </div>
        ))}
      </div>
    )
  }

  return (
    <GenericShopDisplay
      config={HEALER_SHOP_CONFIG}
      items={HEALER_SHOP_ITEMS}
      gold={gold}
      getItemAction={getServiceAction}
    >
      <ActiveBuffsList />
    </GenericShopDisplay>
  )
}
