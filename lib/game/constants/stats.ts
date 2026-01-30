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
    color: 'text-[#ff6b6b]',
    border: 'border-[#ff6b6b]/50',
    bg: 'bg-[#ff6b6b]/20',
  },
  [Stats.INTELLIGENCE]: {
    label: 'Inteligence',
    icon: Brain,
    color: 'text-[#b66bd4]',
    border: 'border-[#b66bd4]/50',
    bg: 'bg-[#b66bd4]/20',
  },
  [Stats.AGILITY]: {
    label: 'Obratnost',
    icon: Zap,
    color: 'text-[#ffd700]',
    border: 'border-[#ffd700]/50',
    bg: 'bg-[#ffd700]/20',
  },
  [Stats.STAMINA]: {
    label: 'Výdrž',
    icon: Shield,
    color: 'text-[#69ccf0]',
    border: 'border-[#69ccf0]/50',
    bg: 'bg-[#69ccf0]/20',
  },
}
