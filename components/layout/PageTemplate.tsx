'use client'

import { GameFooter } from '@/components/features/Game/GameFooter'
import { GameHeader } from '@/components/features/Game/GameHeader'
import { RouteTransition } from '@/components/layout/RouteTransition'
import type { ReactNode } from 'react'

interface PageTemplateProps {
  /** Page title */
  title: string
  /** Subtitle (optional) */
  subtitle?: string
  /** Icon component */
  icon?: any
  /** Background image */
  backgroundImage?: string
  /** Max width constraint for content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Character ID for displaying player stats */
  characterId?: string
  /** Main content */
  children: ReactNode
}

/**
 * Complete page template with header, background, content, and footer
 * Provides consistent structure for all fullscreen game pages
 */
export function PageTemplate({
  title,
  subtitle,
  icon,
  backgroundImage,
  maxWidth = 'lg',
  characterId,
  children,
}: PageTemplateProps) {
  const maxWidthClass = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }[maxWidth]

  return (
    <RouteTransition>
      {/* Full screen container */}
      <div
        className="fixed inset-0 flex flex-col bg-[#0a0806]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Background layer (full width) */}
        {backgroundImage && (
          <div className="absolute inset-0">
            <img src={backgroundImage} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/60" />
          </div>
        )}

        {/* Header - full width with dark background */}
        <div className="relative z-20 w-full border-b border-[#8b6f47] bg-black/90">
          <div className={`mx-auto ${maxWidthClass}`}>
            <GameHeader icon={icon} title={title} subtitle={subtitle} characterId={characterId} />
          </div>
        </div>

        {/* Main content - constrained width, full height */}
        <main
          className={`relative z-10 mx-auto flex h-0 min-h-0 w-full flex-1 ${maxWidthClass} flex-col overflow-hidden md:pt-0`}
        >
          {children}
        </main>

        {/* Footer - full width with dark background */}
        <div className="relative z-20 w-full border-t border-[#8b6f47] bg-black/90">
          <div className={`mx-auto ${maxWidthClass}`}>
            <GameFooter />
          </div>
        </div>
      </div>
    </RouteTransition>
  )
}
