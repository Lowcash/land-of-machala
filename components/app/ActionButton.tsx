'use client'

import { Button } from '@/components/ui/button'
import type { ComponentProps, ReactNode } from 'react'

interface ActionButtonProps {
  icon: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: ComponentProps<typeof Button>['variant']
  className?: string
}

export function ActionButton({ icon, onClick, disabled, variant = 'warning', className = '' }: ActionButtonProps) {
  return (
    <Button
      className={`h-12 w-12 border shadow-lg ${className}`}
      variant={variant}
      size='icon-lg'
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  )
}
