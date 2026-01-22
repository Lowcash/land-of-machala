'use client'

import { Card } from '@/components/ui/card'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { ServiceTable } from '@/components/ui/service-table'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export interface ShopItem {
  id?: number
  name: string
  description?: string
  price: number
  icon?: LucideIcon
  type?: string
  // Dynamic properties for flexible item types
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
  itemColumns,
  customContent,
  quote,
}: ShopInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

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
            <Typography variant="h3" className="text-game-gold">
              {title}
            </Typography>
          </div>

          <div className="border-game-copper/20 text-game-copper-muted rounded border bg-black/40 p-3 text-sm italic">
            "{greeting}"
          </div>

          <div className="bg-game-gold/10 border-game-gold/30 flex items-center justify-between rounded border p-3">
            <span className="text-game-gold-muted text-xs tracking-wider uppercase">Zlato</span>
            <span className="text-game-gold font-bold">{gold}g</span>
          </div>

          {quote && (
            <Typography variant="muted" className="mt-auto text-center italic">
              {quote}
            </Typography>
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
          <Typography variant="h4" className="text-game-copper-muted">
            Nabídka zboží
          </Typography>
          <div className="text-game-copper-muted text-xs tracking-wider uppercase">
            {items.length} předmětů
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <ScrollIndicator targetRef={scrollRef} />
          <div ref={scrollRef} className="scrollbar-custom h-full overflow-y-auto p-4">
            <ServiceTable
              items={items}
              mode="cards"
              columns={
                itemColumns || [
                  { key: 'name', label: 'Předmět' },
                  {
                    key: 'price',
                    label: 'Cena',
                    render: (item: any) => <span className="text-game-gold">{item.price}g</span>,
                  },
                ]
              }
              actions={[
                {
                  label: 'Koupit',
                  onClick: handleBuy,
                  disabled: (item: any) => gold < item.price,
                },
              ]}
              rowIcon={(item: any) => {
                if (!item.icon) return null
                const Icon = item.icon
                return <Icon className={cn('h-4 w-4', item.iconColor || 'text-game-gold-muted')} />
              }}
              emptyMessage="Obchodník momentálně nic nenabízí."
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
