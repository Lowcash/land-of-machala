import type { LucideIcon } from 'lucide-react'
import { BicepsFlexed, Brain, Shield, Zap } from 'lucide-react'

import { Stats } from './mechanics'

export const STAT_CONFIG: Record<
  Stats,
  { label: string; icon: LucideIcon; color: string; border: string; bg: string }
> = {
  [Stats.STRENGTH]: {
    label: 'Síla',
    icon: BicepsFlexed,
    color: 'text-game-danger',
    border: 'border-game-danger/50',
    bg: 'bg-game-danger/20',
  },
  [Stats.INTELLIGENCE]: {
    label: 'Inteligence',
    icon: Brain,
    color: 'text-game-magic',
    border: 'border-game-magic/50',
    bg: 'bg-game-magic/20',
  },
  [Stats.AGILITY]: {
    label: 'Obratnost',
    icon: Zap,
    color: 'text-game-gold',
    border: 'border-game-gold/50',
    bg: 'bg-game-gold/20',
  },
  [Stats.STAMINA]: {
    label: 'Výdrž',
    icon: Shield,
    color: 'text-game-info',
    border: 'border-game-info/50',
    bg: 'bg-game-info/20',
  },
}
