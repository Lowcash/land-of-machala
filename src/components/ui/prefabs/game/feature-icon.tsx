import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface FeatureIconProps {
  icon: LucideIcon
  color?: 'gold' | 'secondary' | 'ivory'
  className?: string
}

export function FeatureIcon({ icon: Icon, color = 'gold', className }: FeatureIconProps) {
  const colors = {
    gold: 'text-(--color-gold)',
    secondary: 'text-(--color-secondary)',
    ivory: 'text-(--color-ivory)',
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        'before:absolute before:inset-0 before:rounded-full before:bg-(--color-gold)/5 before:blur-xl',
        className
      )}
    >
      <Icon className={cn('relative z-10 h-12 w-12', colors[color])} />
    </div>
  )
}
