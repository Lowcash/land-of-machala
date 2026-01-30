import type { ShopConfig, ShopItem } from '@/lib/types/shop'

import { LocationLayout } from '../../Shared/components/LocationLayout'
import { ShopGrid } from './ShopGrid'
import { ShopItemCard } from './ShopItemCard'

interface GenericShopDisplayProps {
  config: ShopConfig
  items: ShopItem[]
  gold: number
  // Function that returns a bound server action for a given item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemAction: (item: ShopItem) => () => Promise<any>
  children?: React.ReactNode
}

export function GenericShopDisplay({
  config,
  items,
  gold,
  getItemAction,
  children,
}: GenericShopDisplayProps) {
  return (
    <LocationLayout title={config.name} description={config.description}>
      {children}
      <ShopGrid>
        {items.map((item) => (
          <ShopItemCard key={item.id} item={item} gold={gold} buyAction={getItemAction(item)} />
        ))}
      </ShopGrid>
    </LocationLayout>
  )
}
