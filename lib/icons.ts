import {
  Axe,
  Beer,
  Circle,
  Coins,
  Cross,
  Crown,
  EyeOff,
  Feather,
  FlaskConical,
  Footprints,
  Gem,
  Hammer,
  Heart,
  Home,
  type LucideIcon,
  Map,
  MapPin,
  Mountain,
  Scroll,
  Shield,
  Skull,
  Sparkles,
  Sword,
  Swords,
  Target,
  Trophy,
  User,
  Wand,
  Zap,
} from 'lucide-react'

/**
 * Centralized icon mapping for the entire application
 * Maps string names to Lucide icon components
 */
export const iconMap: Record<string, LucideIcon> = {
  // Weapons
  axe: Axe,
  bow: Target,
  sword: Sword,
  dagger: Sword,
  swords: Swords,
  crossbow: Target,
  wand: Wand,
  staff: Wand,

  // Armor & Equipment
  shield: Shield,
  armor: Shield,
  helmet: Shield,
  gloves: Shield,
  boots: Footprints,

  // Potions & Consumables
  potion: FlaskConical,
  'potion-red': FlaskConical,
  'potion-blue': FlaskConical,
  elixir: FlaskConical,

  // Resources
  coins: Coins,
  crystal: Gem,
  ore: Mountain,
  scroll: Scroll,

  // Achievements & UI
  trophy: Trophy,
  crown: Crown,
  sparkles: Sparkles,
  zap: Zap,

  // Map & Location
  map: Map,
  mappin: MapPin,
  home: Home,
  mountain: Mountain,

  // Misc
  beer: Beer,
  circle: Circle,
  cross: Cross,
  'eye-off': EyeOff,
  feather: Feather,
  hammer: Hammer,
  heart: Heart,
  skull: Skull,
  target: Target,
  user: User,
}

/**
 * Gets icon component from string name (case-insensitive)
 * @param name - Icon name (null/undefined safe)
 * @returns Lucide icon component (defaults to Circle)
 */
export function getIconFromName(name: string | null | undefined): LucideIcon {
  if (!name) return Circle
  const normalizedName = name.toLowerCase()
  return iconMap[normalizedName] || Circle
}
