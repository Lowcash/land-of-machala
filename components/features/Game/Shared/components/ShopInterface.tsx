'use client'

import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

export interface ShopItem {
  id?: number | string
  name: string
  description?: string
  price: number
  icon?: LucideIcon
  type?: string
  action?: string
  iconColor?: string
  iconBg?: string
  attack?: number
  defense?: number
}

export interface ShopInterfaceProps {
  items: ShopItem[]
  gold: number
  onBuy: (item: ShopItem) => void
}

export function ShopInterface({ gold, items, onBuy }: ShopInterfaceProps) {
  const handleBuy = (item: ShopItem) => {
    if (gold < item.price) {
      toast.error('Nemáš dost zlata!')
      return
    }
    onBuy(item)
  }

  return (
    <div className="space-y-2">
      {items.length === 0 ? (
        <div className="py-4 text-center text-xs text-[#8b7355] italic">
          Obchodník momentálně nic nenabízí.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id || item.name}
                className="group flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-2.5 transition-colors hover:border-[#d4a574] hover:bg-black/60"
              >
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="flex h-9 w-9 items-center justify-center rounded border border-[#8b6f47]/30 bg-[#ffd700]/5">
                      <Icon className={cn('h-4 w-4', item.iconColor || 'text-[#ffd700]')} />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#f5e6d3]">{item.name}</span>
                    {item.description && (
                      <span className="text-[10px] leading-tight text-[#8b7355]">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-[#8b6f47]/20 pl-2">
                  <span className="text-xs font-bold whitespace-nowrap text-[#ffd700]">
                    {item.price}g
                  </span>
                  <Button
                    variant="game-secondary"
                    size="sm"
                    onClick={() => handleBuy(item)}
                    disabled={gold < item.price}
                    className="h-7 px-2 text-[10px] uppercase"
                  >
                    Koupit
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
