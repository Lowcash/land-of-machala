import type { ShopItem } from '@/lib/types/shop'
import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'

import { ShopBuyButton } from './ShopBuyButton'

interface ShopItemCardProps {
  item: ShopItem
  gold: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buyAction: () => Promise<any>
  disabled?: boolean
}

export function ShopItemCard({ item, gold, buyAction, disabled }: ShopItemCardProps) {
  const canAfford = gold >= item.price
  /* const isLocked = item.requirements && (
    (item.requirements.level && false) || 
    (item.requirements.quest && false)
  ) */
  return (
    <Card
      className={cn(
        'group border-border/50 relative flex flex-col overflow-hidden bg-black/40 transition-all hover:bg-black/60',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      {/* Icon/Image Placeholder */}
      <div className="relative aspect-square w-full overflow-hidden bg-white/5 p-4 transition-transform group-hover:scale-105">
        {item.iconName ? (
          // Placeholder for dynamic icon loading. In real app, we'd map iconName to actual icon or image path
          <div className="flex h-full w-full items-center justify-center text-4xl opacity-50">
            {/* We can render Lucide icon here if we have a map, or Image */}
            Using Icon: {item.iconName}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/10" />
        )}

        {/* Price Tag Overlay */}
        <div className="absolute top-2 right-2 rounded-full border border-[#ffd700]/20 bg-black/60 px-2 py-1 text-xs font-bold text-[#ffd700] backdrop-blur-sm">
          {item.price}g
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-bold text-[#e5d5c5] transition-colors group-hover:text-[#ffd700]">
          {item.name}
        </h3>

        <p className="text-muted-foreground mt-1 line-clamp-2 min-h-[2.5em] text-xs">
          {item.description}
        </p>

        <div className="mt-auto pt-4">
          <ShopBuyButton price={item.price} canAfford={canAfford} action={buyAction} fullWidth />
        </div>
      </div>
    </Card>
  )
}
