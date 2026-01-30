'use client'

import { Anvil } from 'lucide-react'

import { SMITH_SHOP_CONFIG, SMITH_SHOP_ITEMS } from '@/lib/game/constants/shops'
import { useShopActions } from '@/lib/hooks/game'
import type { ShopItem } from '@/lib/types/shop'

import { GenericShopDisplay } from '../../Shared/Shop/GenericShopDisplay'
import { LocationAction } from '../../Shared/components/LocationAction'

interface SmithShopProps {
  gold: number
}

export function SmithShop({ gold }: SmithShopProps) {
  // 1. Hooks
  const { handleBuyItem } = useShopActions()

  // 2. Navigation State - None currently

  // 3. Handlers
  const getBuyAction = (item: ShopItem) => () => handleBuyItem(item, 'smith')

  // 4. Sub-components (Render helpers)
  const RepairServices = () => (
    <div className="pt-2 pb-4">
      <h5 className="mb-2 text-[10px] font-bold text-[#8b7355] uppercase">Služby a opravy</h5>
      <LocationAction
        title="Opravit vybavení (WIP)"
        description="Kovář ti nabrousí meč a vyklepe zbroj."
        icon={Anvil}
        disabled
        variant="secondary"
        className="opacity-50"
      />
    </div>
  )

  return (
    <GenericShopDisplay
      config={SMITH_SHOP_CONFIG}
      items={SMITH_SHOP_ITEMS}
      gold={gold}
      getItemAction={getBuyAction}
    >
      <RepairServices />
    </GenericShopDisplay>
  )
}
