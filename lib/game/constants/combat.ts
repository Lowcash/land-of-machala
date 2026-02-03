import { ArrowLeft, Shield, Sparkles, Target, Zap } from 'lucide-react'

export const COMBAT_ACTIONS = [
  {
    id: 'attack',
    label: 'Rychlý útok',
    subLabel: 'Základní',
    loadingLabel: 'Útočím...',
    action: 'attack',
    group: 'offensive',
    variant: 'primary',
    icon: Zap,
  },
  {
    id: 'strong-attack',
    label: 'Silný úder',
    subLabel: 'Vysoké poškození',
    loadingLabel: 'Útočím...',
    action: 'attack',
    group: 'offensive',
    variant: 'danger',
    icon: Target,
  },
  {
    id: 'defend',
    label: 'Obrana',
    subLabel: 'Sníží poškození',
    loadingLabel: 'Bráním...',
    action: 'defend',
    group: 'defensive',
    variant: 'secondary',
    icon: Shield,
  },
  {
    id: 'special',
    label: 'Speciální útok',
    subLabel: '-30 Mana',
    loadingLabel: 'Vyvolávám...',
    action: 'special',
    variant: 'magic',
    group: 'offensive',
    icon: Sparkles,
  },
  {
    id: 'flee',
    label: 'Útěk',
    subLabel: 'Šance 50%',
    loadingLabel: 'Utíkám...',
    action: 'flee',
    variant: 'muted',
    group: 'defensive',
    icon: ArrowLeft,
  },
] as const

export type CombatActionType = (typeof COMBAT_ACTIONS)[number]['action']
