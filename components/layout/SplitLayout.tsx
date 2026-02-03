import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { VStack } from '@/components/ui/stack'

interface SplitLayoutProps {
  /** Left panel content (list/grid) */
  main: ReactNode
  /** Right panel content (details) */
  aside: ReactNode
  /** Aside width on desktop */
  asideWidth?: 'sm' | 'md' | 'lg' | 'xl'
  /** Hide aside on mobile (default: true) */
  hideMobileAside?: boolean
  /** Custom className */
  className?: string
}

const ASIDE_WIDTH_CLASSES = {
  sm: 'md:w-64',
  md: 'md:w-80',
  lg: 'md:w-96',
  xl: 'md:w-[28rem]',
}

/**
 * Split view layout - main content on left, details sidebar on right
 * Mobile: full width main only, details in overlay/modal
 * Desktop: side-by-side layout
 *
 * Replaces repeated flex/grid patterns for list+detail views
 */
export function SplitLayout({
  main,
  aside,
  asideWidth = 'md',
  hideMobileAside = true,
  className = '',
}: SplitLayoutProps) {
  return (
    <VStack
      direction="row"
      flex="1"
      fullHeight
      overflow="hidden"
      _internalClassName={cn('min-h-0', className)}
    >
      {/* Main content - always visible, with overflow handling */}
      <VStack flex="1" fullHeight overflow="hidden" _internalClassName="min-h-0 min-w-0">
        {main}
      </VStack>

      {/* Aside - hidden on mobile by default */}
      <VStack
        as="aside"
        shrink="0"
        fullHeight
        overflow="hidden"
        backdrop="medium"
        border="game-l"
        _internalClassName={cn(
          hideMobileAside ? 'hidden md:flex' : 'flex',
          ASIDE_WIDTH_CLASSES[asideWidth as keyof typeof ASIDE_WIDTH_CLASSES],
          'bg-black/70 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]'
        )}
      >
        {aside}
      </VStack>
    </VStack>
  )
}
