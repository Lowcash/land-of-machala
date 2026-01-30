import { ArrowRight, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { TradeableItem } from './types'

export type TradeItem = TradeableItem

export interface HaggleState {
  success: boolean
  message?: string
}

export interface TradePanelProps {
  items: TradeItem[]
  onAction: (item: TradeItem) => void
  onHaggle?: (item: TradeItem, e: React.MouseEvent) => void
  actionLabel?: string
  emptyMessage?: string
  haggledItems?: Record<string | number, HaggleState>
  currencyIcon?: React.ReactNode // e.g., "g" or icon
  disabled?: boolean
}

export function TradePanel({
  items,
  onAction,
  onHaggle,
  actionLabel = 'Prodat',
  emptyMessage = 'Žádné předměty.',
  haggledItems = {},
  currencyIcon = 'g',
  disabled = false,
}: TradePanelProps) {
  return (
    <div className="scrollbar-custom max-h-75 space-y-2 overflow-y-auto">
      {items.length === 0 ? (
        <div className="p-4 text-center text-xs text-[#8b7355]">{emptyMessage}</div>
      ) : (
        items.map((item) => {
          const haggleState = haggledItems[item.id]

          return (
            <div
              key={item.id}
              onClick={() => !disabled && onAction(item)}
              title={actionLabel}
              className={`group relative w-full rounded border border-[#8b6f47]/50 bg-black/60 p-2 text-left transition-all ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-[#69ccf0]'
              }`}
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
                    {item.description ? (
                      <div className="text-[10px] text-[#8b7355] italic">{item.description}</div>
                    ) : (
                      <div className="text-[10px] text-[#8b7355]">{item.type}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onHaggle && !haggleState && item.canHaggle !== false && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!disabled) onHaggle(item, e)
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-[#8b7355] hover:bg-[#69ccf0]/20 hover:text-[#69ccf0]"
                      title="Smlouvat o ceně"
                      disabled={disabled}
                    >
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  )}
                  <div
                    className={`flex items-center gap-1 font-mono text-xs ${
                      haggleState
                        ? haggleState.success
                          ? 'text-green-400'
                          : 'text-red-400'
                        : 'text-[#69ccf0]'
                    }`}
                  >
                    <ArrowRight className="h-3 w-3" />
                    {item.price}
                    {currencyIcon}
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
