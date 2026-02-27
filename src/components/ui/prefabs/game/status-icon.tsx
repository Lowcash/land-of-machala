import { type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface StatusIconProps {
  icon: LucideIcon
  variant?: 'danger' | 'success' | 'info' | 'warning'
}

export function StatusIcon({ icon: Icon, variant = 'info' }: StatusIconProps) {
  const variants = {
    danger: 'bg-(--color-danger)/10 text-(--color-danger)',
    success: 'bg-(--color-success)/10 text-(--color-success)',
    info: 'bg-(--color-info)/10 text-(--color-info)',
    warning: 'bg-yellow-500/10 text-yellow-500',
  }

  return (
    <div className={cn('rounded-full p-4', variants[variant])}>
      <Icon className="h-12 w-12" />
    </div>
  )
}
