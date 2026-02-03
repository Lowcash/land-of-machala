import { ArrowRight, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ActionRow, GameIcon } from '@/components/ui/display'
import { GameList } from '@/components/ui/game-list'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, Label, Span } from '@/components/ui/typography'

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
  emptyMessage = 'Žádné předměty.',
  haggledItems = {},
  currencyIcon = 'g',
  disabled = false,
}: TradePanelProps) {
  return (
    <GameList
      data={items}
      emptyMessage={emptyMessage}
      renderItem={(item) => {
        const haggleState = haggledItems[item.id]

        return (
          <ActionRow onClick={() => !disabled && onAction(item)} disabled={disabled}>
            <HStack gap="sm">
              <GameIcon
                icon={item.icon}
                color="gold"
                indicator={item.equipped}
                indicatorColor="success"
              />
              <VStack gap="none">
                <Label color="gold">{item.name}</Label>
                {item.description ? (
                  <Caption color="muted" italic>
                    {item.description}
                  </Caption>
                ) : (
                  <Caption color="muted">{item.type}</Caption>
                )}
              </VStack>
            </HStack>

            <HStack gap="sm">
              {onHaggle && !haggleState && item.canHaggle !== false && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!disabled) onHaggle(item, e)
                  }}
                  variant="ghost_game"
                  size="icon-xs"
                  title="Smlouvat o ceně"
                  disabled={disabled}
                  icon={MessageSquare}
                />
              )}
              <HStack
                gap="xs"
                _internalClassName={
                  haggleState
                    ? haggleState.success
                      ? 'text-game-success'
                      : 'text-game-danger'
                    : 'text-game-info'
                }
              >
                <ArrowRight className="h-3 w-3" />
                <Span font="mono">
                  {item.price}
                  {currencyIcon}
                </Span>
              </HStack>
            </HStack>
          </ActionRow>
        )
      }}
    />
  )
}
