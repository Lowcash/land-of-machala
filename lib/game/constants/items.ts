import { ACHIEVEMENTS, ACHIEVEMENT_ICONS } from './achievements'
import { ARMOR } from './items/armor'
import { CONSUMABLES } from './items/consumables'
import { WEAPONS } from './items/weapons'
import { HEALER_SERVICES, type HealerService } from './services'

// Re-export specific items for Shop configurations
export const SMITH_STOCK = [...WEAPONS, ...ARMOR] as const

// Filter consumables for specific shops to maintain separation
export const MARKET_STOCK = CONSUMABLES.filter((i) => i.id < 200)

export const BLACK_MARKET_STOCK = CONSUMABLES.filter((i) => i.id >= 200)

// Re-export everything for backward compatibility and general usage
export {
  ACHIEVEMENTS,
  ACHIEVEMENT_ICONS,
  ARMOR,
  CONSUMABLES,
  HEALER_SERVICES,
  WEAPONS,
  type HealerService,
}
