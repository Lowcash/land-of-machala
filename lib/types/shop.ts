import type { LucideIcon } from 'lucide-react'

/**
 * Shop configuration defining basic shop properties
 */
export interface ShopConfig {
  readonly id: string
  readonly name: string
  readonly icon: LucideIcon
  readonly description: string
  readonly currency: 'gold' | 'gems'
  readonly categories?: readonly string[]
}

/**
 * Individual item available in a shop
 */
export interface ShopItem {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly price: number
  readonly iconName: string
  readonly category?: string
  readonly requirements?: {
    readonly level?: number
    readonly quest?: string
  }
}

/**
 * Result from shop purchase action
 */
export interface ShopPurchaseResult {
  success: boolean
  error?: string
  data?: {
    itemId: string
    newGold: number
  }
}
