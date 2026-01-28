'use client'

import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { ActionItem } from '@/components/ui/Action'
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
      <ActionItem
        label={title}
        subLabel={description}
        icon={Icon}
        onClick={onClick || (() => {})}
        disabled={disabled}
        loading={loading}
        variant="secondary"
        className={cn(
          'h-24 flex-col gap-2 border-[#d4a574]/30 bg-black/40 hover:bg-black/60 hover:text-[#ffd700]',
          className
        )}
        layout="col"
      />
    )
  }

  if (variant === 'compact') {
    return (
      <ActionItem
        label={title}
        subLabel={description}
        icon={Icon}
        onClick={onClick || (() => {})}
        disabled={disabled}
        loading={loading}
        variant="secondary"
        className={cn('h-11 w-full justify-between px-4', className)}
        layout="row"
      />
    )
  }

  // Default variant is complex (has children, rightElement etc.)
  // We keep it as Card for now but style it consistently
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
