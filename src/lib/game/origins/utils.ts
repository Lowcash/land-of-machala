import {
  Activity,
  Brain,
  Droplet,
  Heart,
  Shield,
  Sparkles,
  Sword,
  Swords,
  Target,
  User,
  Wand2,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'

// Icon mapping for selection items (Races/Classes)
export const SELECTION_ICONS: Record<string, LucideIcon> = {
  User,
  Shield,
  Zap,
  Swords,
  Target,
  Sparkles,
  Sword,
  Wand2,
  Heart,
  Droplet,
  Wind,
  Brain,
  Activity,
} as const

// Icon mapping for stats
export const STAT_ICONS: Record<string, LucideIcon> = {
  strength: Sword,
  intelligence: Brain,
  agility: Wind,
  stamina: Activity,
  hp: Heart,
  mana: Droplet,
} as const

export function getSelectionIcon(iconName: string) {
  return SELECTION_ICONS[iconName] || User
}

export function getStatIcon(statName: string) {
  return STAT_ICONS[statName] || Activity
}

export function formatStatValue(val: number): string {
  if (val === 0) return '0'
  return val > 0 ? `+${val}` : `${val}`
}
