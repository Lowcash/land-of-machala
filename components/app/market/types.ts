import type { ArmoryItem } from '@/hooks/api/use-armory'

export type MarketActionEvent = (item: ArmoryItem, action: Action) => void
export type MarketLeaveEvent = () => void

export type Action = 'buy' | 'sell'

export const DECISION = {
  BACK: 'back',
} as const

export interface MarketProps {
  armoryId: string
  action: Action
  onMarketAction: MarketActionEvent
  onMarketLeave?: MarketLeaveEvent
}
