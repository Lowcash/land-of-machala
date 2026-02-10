import { type LucideIcon, Scroll, Sparkles, Swords, User, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

const ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-10 w-10',
} as const

interface IconProps {
  size?: keyof typeof ICON_SIZES
  color?: 'gold' | 'secondary' | 'ivory'
}

function BaseIcon({
  icon: Icon,
  size = 'sm',
  color,
}: {
  icon: LucideIcon
  size?: keyof typeof ICON_SIZES
  color?: 'gold' | 'secondary' | 'ivory'
}) {
  const colorClass = color
    ? {
        gold: 'text-(--color-gold)',
        secondary: 'text-(--color-secondary)',
        ivory: 'text-(--color-ivory)',
      }[color]
    : ''

  return <Icon className={cn(ICON_SIZES[size], colorClass)} />
}

export function UserIcon({ size, color }: IconProps) {
  return <BaseIcon icon={User} size={size} color={color} />
}

export function UsersIcon({ size, color }: IconProps) {
  return <BaseIcon icon={Users} size={size || 'md'} color={color} />
}

export function ScrollIcon({ size, color }: IconProps) {
  return <BaseIcon icon={Scroll} size={size || 'md'} color={color} />
}

export function SparklesIcon({ size, color }: IconProps) {
  return <BaseIcon icon={Sparkles} size={size || 'xs'} color={color || 'secondary'} />
}

export function SwordsIcon({ size, color }: IconProps) {
  return <BaseIcon icon={Swords} size={size || 'xl'} color={color} />
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
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#ffd700]/20 to-[#8b6f47]/20 blur-2xl" />
      <div
        className={cn(
          'relative rounded-full border-2 border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#6d5a3e] shadow-2xl',
          containerSizes[size as keyof typeof containerSizes] || containerSizes.xl
        )}
      >
        <SwordsIcon size={size === 'xxl' ? 'xl' : size} />
      </div>
    </div>
  )
}
