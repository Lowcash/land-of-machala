import {
  Dices,
  Flame,
  Lock,
  type LucideIcon,
  Mail,
  RefreshCcw,
  Scroll,
  Shield,
  Sparkles,
  Swords,
  User,
  Users,
  Zap,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const ICON_SIZES = {
  xs: 'h-3 w-3',
  stat: 'h-[14px] w-[14px]',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-10 w-10',
} as const
export type IconColor =
  | 'primary'
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
  className?: string
}

export function Icon({
  icon: SimpleIcon,
  size = 'md',
  color,
  className,
}: { icon: LucideIcon } & IconProps) {
  const colorClass = color
    ? (
        {
          primary: 'text-(--color-primary)',
          gold: 'text-(--color-gold)',
          secondary: 'text-(--color-secondary)',
          ivory: 'text-(--color-ivory)',
          hp: 'text-(--color-stat-hp)',
          mana: 'text-(--color-stat-mana)',
          strength: 'text-(--color-stat-strength)',
          intelligence: 'text-(--color-stat-intelligence)',
          agility: 'text-(--color-stat-agility)',
          stamina: 'text-(--color-stat-stamina)',
        } as Record<IconColor, string>
      )[color]
    : ''

  return <SimpleIcon className={cn(ICON_SIZES[size], colorClass, className)} />
}

export function UserIcon({ size = 'xl', color }: IconProps) {
  return <Icon icon={User} size={size} color={color} />
}

export function UsersIcon({ size, color }: IconProps) {
  return <Icon icon={Users} size={size} color={color} />
}

export function ScrollIcon({ size, color }: IconProps) {
  return <Icon icon={Scroll} size={size} color={color} />
}

export function SparklesIcon({ size = 'xl', color }: IconProps) {
  return <Icon icon={Sparkles} size={size} color={color} />
}

export function SwordsIcon({ size = 'xl', color }: IconProps) {
  return <Icon icon={Swords} size={size} color={color} />
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

export function ShieldIcon({ size, color }: IconProps) {
  return <Icon icon={Shield} size={size} color={color} />
}

export function ZapIcon({ size, color }: IconProps) {
  return <Icon icon={Zap} size={size} color={color} />
}

export function FlameIcon({ size, color }: IconProps) {
  return <Icon icon={Flame} size={size} color={color} />
}

/**
 * A standard prefab for status/indicator icons.
 * Includes a subtle fade-in animation by default.
 */
export function StatusIcon({
  icon,
  size = 'sm',
  color = 'primary',
}: {
  icon: LucideIcon
  size?: keyof typeof ICON_SIZES
  color?: IconColor
}) {
  return <Icon icon={icon} size={size} color={color} className="animate-fade-in" />
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
