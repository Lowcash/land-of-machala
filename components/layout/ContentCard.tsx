'use client'

import type { ReactNode } from 'react'

interface ContentCardProps {
  /** Card content */
  children: ReactNode
  /** Visual variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Enable hover effect */
  hoverable?: boolean
  /** Custom className */
  className?: string
  /** Click handler */
  onClick?: () => void
}

const VARIANT_CLASSES = {
  default: 'border-[#8b6f47] bg-black/60',
  primary: 'border-[#d4a574] bg-linear-to-br from-black/90 to-black/70',
  success: 'border-[#6fbf6f]/50 bg-black/70',
  warning: 'border-[#ffd700]/50 bg-black/70',
  danger: 'border-[#ff6b6b]/50 bg-black/70',
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-2',
  md: 'p-3 sm:p-4',
  lg: 'p-4 sm:p-6',
}

/**
 * Reusable content card with consistent styling
 * Replaces repeated rounded border/bg pattern
 */
export function ContentCard({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  onClick,
}: ContentCardProps) {
  const isClickable = !!onClick

  return (
    <div
      className={`rounded-lg border-2 ${VARIANT_CLASSES[variant]} ${PADDING_CLASSES[padding]} ${hoverable || isClickable ? 'transition-all hover:border-[#ffd700] hover:bg-black/80' : ''} ${isClickable ? 'cursor-pointer' : ''} ${className} `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
