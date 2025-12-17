import { Heart, Shield, Sparkles, Swords, Target, Zap } from 'lucide-react'

export const ICON_MAP: Record<string, any> = {
  swords: Swords,
  shield: Shield,
  sparkles: Sparkles,
  zap: Zap,
  heart: Heart,
  target: Target,
}

export function getIconFromName(iconName: string) {
  return ICON_MAP[iconName.toLowerCase()] || Swords
}
