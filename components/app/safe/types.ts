import type { BankAccountItem } from '@/hooks/api/use-bank'
import type { InventoryItem } from '@/hooks/api/use-inventory'

export type SafeActionEvent = (item: BankAccountItem | InventoryItem, action: Action) => void
export type SafeMoneyActionEvent = (money: string, action: Action) => void
export type SafeLeaveEvent = () => void

export type Action = 'deposit' | 'withdraw'

export const DECISION = {
  BACK: 'back',
} as const

export interface SafeProps {
  bankId: string
  action: Action
  onSafeAction?: SafeActionEvent
  onSafeMoneyAction?: SafeMoneyActionEvent
  onSafeLeave?: SafeLeaveEvent
}
