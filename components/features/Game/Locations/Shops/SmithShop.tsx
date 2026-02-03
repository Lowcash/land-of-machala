'use client'

import { Anvil } from 'lucide-react'

import { SMITH_SHOP_CONFIG, SMITH_SHOP_ITEMS } from '@/lib/game/constants/shops'
import { useShopActions } from '@/lib/hooks/game'
import type { ShopItem } from '@/lib/types/shop'

import { VStack } from '@/components/ui/stack'
import { Caption } from '@/components/ui/typography'

import { GenericShopDisplay } from '../../Shared/Shop/GenericShopDisplay'
import { LocationAction } from '../../Shared/components/LocationAction'

interface SmithShopProps {
  gold: number
}

export function SmithShop({ gold }: SmithShopProps) {
  // 1. Hooks
  const { handleBuyItem } = useShopActions()

  // 3. Handlers
  const getBuyAction = (item: ShopItem) => () => handleBuyItem(item, 'smith')

  // 4. Sub-components (Render helpers)
  const RepairServices = () => (
    <VStack pt="sm" pb="md" gap="sm">
      <Caption color="muted" bold uppercase>
        Služby a opravy
      </Caption>
      <LocationAction
        title="Opravit vybavení (WIP)"
        description="Kovář ti nabrousí meč a vyklepe zbroj."
        icon={Anvil}
        disabled
        variant="secondary"
      />
    </VStack>
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
