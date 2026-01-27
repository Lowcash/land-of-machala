'use client'

import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LocationActionProps {
  title: string
  description?: string
  icon: LucideIcon
  onClick?: () => void
  children?: ReactNode
  variant?: 'default' | 'large' | 'compact'
  className?: string
  disabled?: boolean
  loading?: boolean
  rightElement?: ReactNode
}

export function LocationAction({
  title,
  description,
  icon: Icon,
  onClick,
  children,
  variant = 'default',
  className,
  disabled,
  loading,
  rightElement,
}: LocationActionProps) {
  if (variant === 'large') {
    return (
      <Button
        variant="game-secondary"
        className={cn(
          'h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]',
          className
        )}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
      >
        <Icon className="h-8 w-8 text-[#d4a574]" />
        <span className="text-xs font-bold uppercase">{title}</span>
        {description && <span className="text-[10px] lowercase opacity-60">{description}</span>}
      </Button>
    )
  }

  if (variant === 'compact') {
    return (
      <Button
        variant="game-secondary"
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        className={cn('h-11 w-full justify-between px-4', className)}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-[#ffd700]" />
          <span className="text-xs">
            {title} {description && <span className="text-[#ffd700]">{description}</span>}
          </span>
        </div>
        {rightElement}
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        'group flex items-center justify-between border-[#8b6f47]/30 bg-black/40 p-2.5 transition-colors hover:border-[#d4a574] hover:bg-black/60',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded border border-[#8b6f47]/30 bg-[#ffd700]/5">
          <Icon className="h-4 w-4 text-[#ffd700]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#f5e6d3]">{title}</span>
          {description && (
            <span className="text-[10px] leading-tight text-[#8b7355]">{description}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 pl-2">
        {rightElement}
        {children}
        {onClick && (
          <Button
            variant="game-secondary"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            className="h-7 px-2 text-[10px] uppercase"
          >
            Provést
          </Button>
        )}
      </div>
    </Card>
  )
}
