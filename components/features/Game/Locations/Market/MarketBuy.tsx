import type { MarketItem } from './types'

interface MarketBuyProps {
  stock: MarketItem[]
  handleBuy: (item: MarketItem) => void
  disabled?: boolean
}

export function MarketBuy({ stock, handleBuy, disabled = false }: MarketBuyProps) {
  return (
    <div
      className={`scrollbar-custom max-h-75 space-y-2 overflow-y-auto ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    >
      {stock.map((item) => (
        <div
          key={item.id}
          onClick={() => handleBuy(item)}
          className="group relative w-full cursor-pointer rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all hover:border-[#ffd700]"
        >
          <div className="flex items-start justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-[#f5e6d3] group-hover:text-[#ffd700]">
              <item.icon className="h-4 w-4" />
              {item.name}
            </span>
            <span className="font-mono text-xs text-[#ffd700]">{item.price}g</span>
          </div>
        </div>
      ))}
    </div>
  )
}
