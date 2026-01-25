import type { ReactNode } from 'react'

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
    <div className={`flex min-h-0 flex-1 overflow-hidden ${className}`}>
      {/* Main content - always visible, with overflow handling */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{main}</div>

      {/* Aside - hidden on mobile by default */}
      <aside
        className={` ${hideMobileAside ? 'hidden md:block' : 'block'} ${ASIDE_WIDTH_CLASSES[asideWidth]} border-game-gold-muted/50 flex shrink-0 flex-col overflow-hidden border-l bg-black/70 shadow-[-5px_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm`}
      >
        {aside}
      </aside>
    </div>
  )
}
