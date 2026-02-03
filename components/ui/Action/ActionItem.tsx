import type { LucideIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'

export interface ActionItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  label: string
  subLabel?: string
  icon?: LucideIcon
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'default' | 'magic' | 'muted'
  layout?: 'row' | 'col' | 'auto' // Layout direction of content
  cooldown?: number // Percentage 0-100 or potentially generic cooldown logic later
}

// Map logical variants to UI button variants
const VARIANT_MAP: Record<NonNullable<ActionItemProps['variant']>, ButtonProps['variant']> = {
  primary: 'primary',
  secondary: 'secondary_game',
  danger: 'danger',
  success: 'success',
  ghost: 'ghost_game',
  magic: 'magic_game',
  muted: 'muted_game',
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
  layout = 'auto',
  ...props
}: ActionItemProps) {
  const isRow = layout === 'row' || (layout === 'auto' && !!subLabel)

  return (
    <Button
      variant={isRow ? 'row' : VARIANT_MAP[variant] || 'primary'}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      size={isRow ? 'default' : 'lg'}
      label={label}
      subLabel={subLabel}
      icon={Icon}
      {...props}
    />
  )
}
