'use client'

import { GameActivityPanel } from '@/components/features/Game/Activity/GameActivityPanel'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { TransitionLayout } from '@/components/layout/TransitionLayout'
import Image from 'next/image'
import type { ReactNode } from 'react'

export interface PageLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  /** Shows the right-side info log panel (defaults to true) */
  showInfoLog?: boolean
  /** Custom content for the right panel (overrides default InfoLogPanel) */
  rightPanel?: ReactNode
  /** Background image URL */
  backgroundImage?: string
  /** Max width constraint for content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

/**
 * Standard page template for game screens.
 * Designed to be used WITHIN GameLayout.
 * Handles the internal structure: Header -> Split Content/Info -> Footer
 */
export function PageLayout({
  children,
  header,
  footer,
  showInfoLog = true,
  rightPanel,
  backgroundImage,
  maxWidth = 'lg',
  className = '',
}: PageLayoutProps) {
  const maxWidthClass = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }[maxWidth]

  return (
    <TransitionLayout>
      <div className={`relative flex h-full w-full flex-col ${className}`}>
        {/* Page Background */}
        {backgroundImage && (
          <div className="absolute inset-0 -z-10">
            <Image src={backgroundImage} alt="" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/60" />
          </div>
        )}

        {/* Header - Constrained */}
        <div className="pointer-events-none sticky top-0 z-50 w-full">
          <div className="pointer-events-auto mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className={`mx-auto ${maxWidthClass}`}>{header}</div>
          </div>
        </div>

        {/* Main Content Area - Constrained */}
        <div className="relative min-h-0 w-full flex-1 px-4 sm:px-6 lg:px-8">
          <div className={`mx-auto h-full ${maxWidthClass}`}>
            {showInfoLog ? (
              <SplitLayout
                main={<div className="h-full overflow-y-auto">{children}</div>}
                aside={rightPanel || <GameActivityPanel />}
                className="h-full"
                asideWidth="md"
              />
            ) : (
              <div className="scrollbar-hide h-full overflow-y-auto">{children}</div>
            )}
          </div>
        </div>

        {/* Footer Area - Constrained */}
        {footer && (
          <div className="border-game-copper/30 w-full shrink-0 border-t bg-black/40 px-4 py-2 backdrop-blur-md sm:px-6 lg:px-8">
            <div className={`mx-auto ${maxWidthClass}`}>{footer}</div>
          </div>
        )}
      </div>
    </TransitionLayout>
  )
}
