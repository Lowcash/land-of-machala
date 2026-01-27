import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { HaggleState, MarketItem } from './types'

interface MarketBuyProps {
  stock: MarketItem[]
  handleBuy: (item: MarketItem) => void
  handleHaggle: (item: MarketItem, buying: boolean, e: React.MouseEvent) => void
  getPrice: (item: MarketItem, buying: boolean) => number
  haggledItems: Record<number, HaggleState>
}

export function MarketBuy({
  stock,
  handleBuy,
  handleHaggle,
  getPrice,
  haggledItems,
}: MarketBuyProps) {
  return (
    <div className="scrollbar-custom max-h-75 space-y-2 overflow-y-auto">
      {stock.map((item) => {
        const price = getPrice(item, true)
        const haggleState = haggledItems[item.id]

        return (
          <div
            key={item.id}
            onClick={() => handleBuy(item)}
            className="group relative w-full cursor-pointer rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#ffd700]"
          >
            <div className="mb-1 flex items-start justify-between">
              <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#ffd700]">
                <item.icon className="h-4 w-4" />
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                {!haggleState && (
                  <Button
                    onClick={(e) => handleHaggle(item, true, e)}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-1 text-[#d4a574] hover:bg-[#ffd700]/20 hover:text-[#ffd700]"
                    title="Smlouvat"
                  >
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                )}
                <span
                  className={`font-mono text-xs ${haggleState ? (haggleState.success ? 'text-green-400' : 'text-red-400') : 'text-[#ffd700]'}`}
                >
                  {price}g
                </span>
              </div>
            </div>
            {haggleState && (
              <div className="absolute top-1 right-16">
                {haggleState.success ? (
                  <ThumbsUp className="h-3 w-3 text-green-500/50" />
                ) : (
                  <ThumbsDown className="h-3 w-3 text-red-500/50" />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
