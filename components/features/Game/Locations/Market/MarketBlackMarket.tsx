import { Skull } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { MarketItem } from './types'

interface BlackMarketProps {
  stock: MarketItem[]
  handleBuy: (item: MarketItem) => void
}

export function BlackMarket({ stock, handleBuy }: BlackMarketProps) {
  return (
    <div className="space-y-2 rounded border border-[#b66bd4]/30 bg-[#0a050a] p-2">
      <div className="mb-2 flex items-center justify-center gap-2 text-center text-xs font-bold tracking-wider text-[#b66bd4] uppercase">
        <Skull className="h-3 w-3" />
        Nelegální zboží
        <Skull className="h-3 w-3" />
      </div>
      {stock.map((item) => (
        <Button
          key={item.id}
          onClick={() => handleBuy(item)}
          variant="ghost"
          className="group h-auto w-full justify-start rounded border border-[#b66bd4]/30 bg-black/80 p-2 text-left transition-all hover:border-[#b66bd4]"
        >
          <div className="mb-1 flex w-full items-start justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-[#dcd0ff] group-hover:text-[#b66bd4]">
              <item.icon className="h-4 w-4" />
              {item.name}
            </span>
            <span className="text-xs text-[#b66bd4]">{item.price}g</span>
          </div>
        </Button>
      ))}
    </div>
  )
}
