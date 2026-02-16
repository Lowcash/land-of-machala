import {
  Dices,
  Lock,
  type LucideIcon,
  Mail,
  RefreshCcw,
  Scroll,
  Sparkles,
  Swords,
  User,
  Users,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-10 w-10',
} as const

export type IconColor =
  | 'gold'
  | 'secondary'
  | 'ivory'
  | 'hp'
  | 'mana'
  | 'strength'
  | 'intelligence'
  | 'agility'
  | 'stamina'

export interface IconProps {
  size?: keyof typeof ICON_SIZES
  color?: IconColor
}

export function Icon({
  icon: SimpleIcon,
  size = 'sm',
  color,
}: {
  icon: LucideIcon
  size?: keyof typeof ICON_SIZES
  color?: IconColor
}) {
  const colorClass = color
    ? {
        gold: 'text-(--color-gold)',
        secondary: 'text-(--color-secondary)',
        ivory: 'text-(--color-ivory)',
        hp: 'text-(--color-stat-hp)',
        mana: 'text-(--color-stat-mana)',
        strength: 'text-(--color-stat-strength)',
        intelligence: 'text-(--color-stat-intelligence)',
        agility: 'text-(--color-stat-agility)',
        stamina: 'text-(--color-stat-stamina)',
      }[color]
    : ''

  return <SimpleIcon className={cn(ICON_SIZES[size], colorClass)} />
}

export function UserIcon({ size, color }: IconProps) {
  return <Icon icon={User} size={size} color={color} />
}

export function UsersIcon({ size, color }: IconProps) {
  return <Icon icon={Users} size={size || 'md'} color={color} />
}

export function ScrollIcon({ size, color }: IconProps) {
  return <Icon icon={Scroll} size={size || 'md'} color={color} />
}

export function SparklesIcon({ size, color }: IconProps) {
  return <Icon icon={Sparkles} size={size || 'xs'} color={color || 'secondary'} />
}

export function SwordsIcon({ size, color }: IconProps) {
  return <Icon icon={Swords} size={size || 'xl'} color={color} />
}

export function RefreshIcon({ size, color }: IconProps) {
  return <Icon icon={RefreshCcw} size={size} color={color} />
}

export function MailIcon({ size, color }: IconProps) {
  return <Icon icon={Mail} size={size} color={color} />
}

export function LockIcon({ size, color }: IconProps) {
  return <Icon icon={Lock} size={size} color={color} />
}

export function DicesIcon({ size, color }: IconProps) {
  return <Icon icon={Dices} size={size} color={color} />
}

/**
 * Premium Logo prefab with fixed styling but size options.
 */
export function LogoIcon({ size = 'xl' }: { size?: 'lg' | 'xl' | 'xxl' }) {
  const containerSizes = {
    lg: 'p-3',
    xl: 'p-4',
    xxl: 'p-6',
  }

  return (
    <div className="relative mb-4 inline-block">
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-(--color-gold)/20 to-(--color-secondary)/20 blur-2xl" />
      <div
        className={cn(
          'relative rounded-full border-2 border-(--color-gold) bg-linear-to-br from-(--color-secondary) to-black/40 shadow-2xl',
          containerSizes[size as keyof typeof containerSizes] || containerSizes.xl
        )}
      >
        <SwordsIcon size={size === 'xxl' ? 'xl' : size} />
      </div>
    </div>
  )
}
