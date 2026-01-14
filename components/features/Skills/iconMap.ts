import type { LucideIcon } from 'lucide-react'
import { Heart, Shield, Sparkles, Swords, Target, Zap } from 'lucide-react'

export const ICON_MAP: Record<string, LucideIcon> = {
  swords: Swords,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
  heart: Heart,
  target: Target,
}

export function getIconFromName(iconName: string): LucideIcon {
  return ICON_MAP[iconName.toLowerCase()] || Swords
}
