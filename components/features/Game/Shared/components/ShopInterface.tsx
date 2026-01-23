'use client'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export interface ShopItem {
  id?: number
  name: string
  description?: string
  price: number
  icon?: LucideIcon
  type?: string
  // Dynamic properties for flexible item types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface ShopInterfaceProps {
  title: string
  greeting: string
  gold: number
  items: ShopItem[]
  onBuy: (item: ShopItem) => void
  onBack: () => void
  backgroundImage?: string
  // Optional customizations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemColumns?: any[]
  renderItem?: (item: ShopItem) => React.ReactNode
  customContent?: React.ReactNode
  quote?: string
}

export function ShopInterface({
  title,
  greeting,
  gold,
  items,
  onBuy,
  onBack,
  customContent,
  quote,
}: ShopInterfaceProps) {
  useEffect(() => {
    // Optional: could emit info text here if passed as prop,
    // but we can also display it in the UI directly
  }, [])

  const handleBuy = (item: ShopItem) => {
    if (gold < item.price) {
      toast.error('Nemáš dost zlata!')
      return
    }
    onBuy(item)
  }

  return (
    <div
      className="flex h-full flex-col gap-4 p-4 md:grid md:grid-cols-12 md:p-6"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Left Panel - Shopkeeper & Info */}
      <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-3">
        <Card variant="game" className="flex flex-col gap-4 p-4">
          <div className="border-game-copper/20 flex items-center gap-2 border-b pb-2">
            <button
              onClick={onBack}
              className="rounded-full p-1 transition-colors hover:bg-white/5"
            >
              <ArrowLeft className="text-game-gold-muted h-5 w-5" />
            </button>
            <h3 className="font-medieval text-game-gold scroll-m-20 text-2xl font-semibold tracking-tight">
              {title}
            </h3>
          </div>

          <div className="border-game-copper/20 text-game-copper-muted rounded border bg-black/40 p-3 text-sm italic">
            "{greeting}"
          </div>

          <div className="bg-game-gold/10 border-game-gold/30 flex items-center justify-between rounded border p-3">
            <span className="text-game-gold-muted text-xs tracking-wider uppercase">Zlato</span>
            <span className="text-game-gold font-bold">{gold}g</span>
          </div>

          {quote && (
            <p className="text-muted-foreground font-body mt-auto text-center text-sm italic">
              {quote}
            </p>
          )}
        </Card>

        {customContent && (
          <Card variant="muted" className="p-4">
            {customContent}
          </Card>
        )}
      </div>

      {/* Right Panel - Wares */}
      <Card
        variant="game"
        className="flex h-[500px] flex-col overflow-hidden md:col-span-8 md:h-auto lg:col-span-9"
      >
        <div className="border-game-copper/20 flex items-center justify-between border-b bg-black/20 p-3">
          <h4 className="font-medieval text-game-copper-muted scroll-m-20 text-xl font-semibold tracking-tight">
            Nabídka zboží
          </h4>
          <div className="text-game-copper-muted text-xs tracking-wider uppercase">
            {items.length} předmětů
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <ScrollArea className="h-full">
            <div className="h-full p-4">
              {items.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#8b7355] italic">
                  Obchodník momentálně nic nenabízí.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.id || item.name}
                        className="group border-game-copper/30 hover:border-game-gold flex flex-col justify-between rounded border bg-black/40 p-3 transition-colors hover:bg-black/60"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {Icon && (
                              <div className="bg-game-gold/5 flex h-8 w-8 items-center justify-center rounded border border-[#8b6f47]/30">
                                <Icon
                                  className={cn('h-4 w-4', item.iconColor || 'text-game-gold')}
                                />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-[#f5e6d3]">
                                {item.name}
                              </span>
                              {item.description && (
                                <span className="text-[10px] text-[#8b7355]">
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-[#8b6f47]/20 pt-2">
                          <span className="text-game-gold font-bold">{item.price}g</span>
                          <button
                            onClick={() => handleBuy(item)}
                            disabled={gold < item.price}
                            className="hover:bg-game-gold/20 rounded px-2 py-1 text-xs font-bold text-[#d4a574] uppercase transition-colors hover:text-[#ffd700] disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale disabled:hover:bg-transparent"
                          >
                            Koupit
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  )
}
