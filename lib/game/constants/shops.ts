import { Hammer, Heart, ShoppingBag } from 'lucide-react'

import type { ShopConfig, ShopItem } from '@/lib/types/shop'

import { HEALER_SERVICES, SMITH_STOCK } from './items'

export const SMITH_SHOP_CONFIG: ShopConfig = {
  id: 'smith',
  name: 'Kovárna',
  description: 'Hledáš-li ocel, co tě nezradí, jsi na správném místě, poutníku.',
  icon: Hammer,
  currency: 'gold',
}

export const HEALER_SHOP_CONFIG: ShopConfig = {
  id: 'healer',
  name: 'Léčitel',
  description: 'Tvé rány se zahojí, tvá duše najde klid. Moje byliny jsou ti k službám.',
  icon: Heart,
  currency: 'gold',
}

export const MARKET_SHOP_CONFIG: ShopConfig = {
  id: 'market',
  name: 'Tržiště',
  description: 'Vítej na tržišti! Najdeš tu vše, po čem tvé srdce touží... za správnou cenu.',
  icon: ShoppingBag,
  currency: 'gold',
}

// Transform constants to ShopItems
export const SMITH_SHOP_ITEMS: ShopItem[] = SMITH_STOCK.map((item) => ({
  id: item.name, // Using name as ID for consistency with action
  name: item.name,
  description: item.description,
  price: item.price,
  iconName: 'sword', // Default fallback or map based on type
  icon: item.icon,
}))

export const HEALER_SHOP_ITEMS: ShopItem[] = HEALER_SERVICES.map((s) => ({
  id: s.id,
  name: s.name,
  description: s.description,
  price: s.price,
  iconName: 'heart', // Default for healer services
  icon: s.icon,
}))
