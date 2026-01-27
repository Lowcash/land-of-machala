import { ArrowRight, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { HaggleState, MarketItem } from './types'

interface MarketSellProps {
  inventory: MarketItem[]
  handleSell: (item: MarketItem) => void
  handleHaggle: (item: MarketItem, buying: boolean, e: React.MouseEvent) => void
  getPrice: (item: MarketItem, buying: boolean) => number
  haggledItems: Record<number, HaggleState>
}

export function MarketSell({
  inventory,
  handleSell,
  handleHaggle,
  getPrice,
  haggledItems,
}: MarketSellProps) {
  return (
    <div className="scrollbar-custom max-h-75 space-y-2 overflow-y-auto">
      {inventory.length === 0 ? (
        <div className="p-4 text-center text-xs text-[#8b7355]">Tvůj batoh je prázdný.</div>
      ) : (
        inventory.map((item) => {
          const price = getPrice(item, false)
          const haggleState = haggledItems[item.id]

          return (
            <div
              key={item.id}
              onClick={() => handleSell(item)}
              className="group relative w-full cursor-pointer rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#69ccf0]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <item.icon className="h-5 w-5 text-[#8b7355]" />
                    {item.equipped && (
                      <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#6fbf6f]"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-[#f5e6d3]">{item.name}</div>
                    <div className="text-[10px] text-[#8b7355]">{item.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!haggleState && (
                    <Button
                      onClick={(e) => handleHaggle(item, false, e)}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-[#8b7355] hover:bg-[#69ccf0]/20 hover:text-[#69ccf0]"
                      title="Smlouvat o ceně"
                    >
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  )}
                  <div
                    className={`flex items-center gap-1 font-mono text-xs ${haggleState ? (haggleState.success ? 'text-green-400' : 'text-red-400') : 'text-[#69ccf0]'}`}
                  >
                    <ArrowRight className="h-3 w-3" />
                    {price}g
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
