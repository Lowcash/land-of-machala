'use client'

import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

interface BasePanelProps {
  /** Panel title */
  title?: string
  /** Icon component */
  icon?: LucideIcon
  /** Panel content */
  children: ReactNode
  /** Enable scrolling (default: true) */
  scrollable?: boolean
  /** Show scroll indicators (default: true if scrollable) */
  showScrollIndicator?: boolean
  /** Custom className for panel wrapper */
  className?: string
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Border style */
  border?: 'none' | 'subtle' | 'normal' | 'strong'
  /** Background opacity */
  bgOpacity?: 'transparent' | 'light' | 'medium' | 'dark'
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-2',
  md: 'p-3 sm:p-4',
  lg: 'p-4 sm:p-6',
}

const BORDER_CLASSES = {
  none: '',
  subtle: 'border border-[#8b6f47]/30',
  normal: 'border-2 border-[#8b6f47]',
  strong: 'border-2 border-[#d4a574]',
}

const BG_CLASSES = {
  transparent: '',
  light: 'bg-black/40',
  medium: 'bg-black/70',
  dark: 'bg-black/90',
}

/**
 * Base panel component with consistent styling and optional scrolling
 * Replaces repetitive div structures with single unified component
 */
export function BasePanel({
  title,
  icon: Icon,
  children,
  scrollable = true,
  showScrollIndicator = true,
  className = '',
  padding = 'md',
  border = 'normal',
  bgOpacity = 'medium',
}: BasePanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const showIndicator = scrollable && showScrollIndicator

  return (
    <div
      className={`relative flex min-h-0 flex-col rounded-lg ${BORDER_CLASSES[border]} ${BG_CLASSES[bgOpacity]} ${className}`}
    >
      {/* Title Header */}
      {title && (
        <div className={`shrink-0 ${padding === 'none' ? '' : 'px-3 pt-3 sm:px-4 sm:pt-4'}`}>
          <h3
            className="flex items-center gap-2 text-[#ffd700]"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            {Icon && <Icon className="h-5 w-5" />}
            {title}
          </h3>
        </div>
      )}

      {/* Content Area */}
      <div className={`relative min-h-0 flex-1 ${scrollable ? '' : 'overflow-hidden'}`}>
        {showIndicator && <ScrollIndicator targetRef={scrollRef} position="both" />}
        <div
          ref={scrollRef}
          className={`h-full ${scrollable ? 'scrollbar-custom overflow-y-auto' : ''} ${PADDING_CLASSES[padding]}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
