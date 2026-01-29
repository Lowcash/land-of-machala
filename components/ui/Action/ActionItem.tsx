import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

export interface ActionItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  subLabel?: string
  icon?: LucideIcon
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'default'
  layout?: 'row' | 'col' | 'auto' // Layout direction of content
  cooldown?: number // Percentage 0-100 or potentially generic cooldown logic later
}

// Map logical variants to UI button variants
const VARIANT_MAP = {
  primary: 'game-primary',
  secondary: 'game-secondary',
  danger: 'game-danger',
  ghost: 'ghost',
  default: 'default',
} as const

export function ActionItem({
  label,
  subLabel,
  icon: Icon,
  onClick,
  disabled,
  loading,
  variant = 'primary',
  className,
  layout = 'auto',
  style,
  ...props
}: ActionItemProps) {
  // Determine layout classes based on prop or context (could be enhanced)
  const isRow = layout === 'row' || (layout === 'auto' && !!subLabel)

  return (
    <Button
      variant={VARIANT_MAP[variant] || 'game-primary'}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      className={cn(
        'relative overflow-hidden transition-all',
        isRow ? 'h-auto w-full justify-between px-4 py-3' : 'h-24 w-full flex-col gap-2',
        className
      )}
      style={style}
      {...props}
    >
      <div className={cn('flex items-center gap-2', isRow ? '' : 'flex-col')}>
        {Icon && <Icon className={cn('shrink-0', isRow ? 'h-5 w-5' : 'h-6 w-6')} />}
        <span
          className={cn('font-fantasy', isRow ? 'text-sm' : 'text-xs tracking-wider uppercase')}
        >
          {label}
        </span>
      </div>

      {subLabel && (
        <span className={cn('opacity-70', isRow ? 'text-xs' : 'text-[10px]')}>{subLabel}</span>
      )}
    </Button>
  )
}
