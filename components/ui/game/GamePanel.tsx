'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface GamePanelProps {
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
  border?: 'none' | 'subtle' | 'normal' | 'strong' // Mapped to variants if applicable
  /** Background opacity */
  bgOpacity?: 'transparent' | 'light' | 'medium' | 'dark' // Handled by Card variant or overrides
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-2',
  md: 'p-3 sm:p-4',
  lg: 'p-4 sm:p-6',
}

/**
 * Game panel component with consistent styling and optional scrolling.
 * Now wraps the standardized ui/card component.
 */
export function GamePanel({
  title,
  icon: Icon,
  children,
  scrollable = true,
  showScrollIndicator = true,
  className = '',
  padding = 'md',
  // Props mapped to Card/Internal logic
}: GamePanelProps) {
  // We use the 'game' variant of Card for the standard look
  // If border/bg props are passed, we might override,
  // but for standardization we prefer the default Game Card look.

  return (
    <Card
      variant="game"
      className={cn('relative flex min-h-0 flex-col overflow-hidden border-2', className)}
    >
      {/* Title Header */}
      {title && (
        <CardHeader className="shrink-0 border-b border-[#8b6f47] bg-black/40 px-3 py-3 sm:px-4 sm:py-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            {Icon && <Icon className="h-5 w-5" />}
            {title}
          </CardTitle>
        </CardHeader>
      )}

      {/* Content Area */}
      <div className={`relative min-h-0 flex-1 ${scrollable ? '' : 'overflow-hidden'}`}>
        {scrollable ? (
          <ScrollArea className="h-full" showIndicators={showScrollIndicator}>
            <div className={`h-full ${PADDING_CLASSES[padding]}`}>{children}</div>
          </ScrollArea>
        ) : (
          <div className={`h-full ${PADDING_CLASSES[padding]}`}>{children}</div>
        )}
      </div>
    </Card>
  )
}
