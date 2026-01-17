import Image from 'next/image'
import type { ReactNode } from 'react'

interface GameLayoutProps {
  children: ReactNode
  /** Background image URL */
  backgroundImage?: string
  /** Custom background class (if not using image) */
  backgroundClass?: string
  /** Whether content should scroll (false = fullscreen sections) */
  scrollable?: boolean
  /** Max width constraint for content */
  maxWidth?: 'default' | 'wide' | 'full'
}

/**
 * Unified layout component for all game screens
 * Provides consistent structure: background, content area, optional scrolling
 */
export function GameLayout({
  children,
  backgroundImage,
  backgroundClass = 'bg-[#0a0806]',
  scrollable = false,
  maxWidth = 'default',
}: GameLayoutProps) {
  const maxWidthClass = {
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  }[maxWidth]

  return (
    <div
      className={`flex h-screen flex-col overflow-hidden ${backgroundClass}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background Layer */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 flex justify-center">
            <div className="relative h-full w-full max-w-500">
              <Image src={backgroundImage} alt="" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>
            </div>
            {/* Black bars for ultra-wide screens */}
            <div className="pointer-events-none absolute inset-y-0 right-0 left-0">
              <div className="relative mx-auto h-full max-w-500">
                <div className="absolute inset-y-0 left-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
                <div className="absolute inset-y-0 right-0 w-[calc((100vw-2000px)/2)] bg-black"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Content Layer */}
      <div
        className={`relative z-10 flex flex-1 flex-col ${scrollable ? 'overflow-y-auto' : 'overflow-hidden'}`}
      >
        <div
          className={`w-full ${maxWidthClass} mx-auto flex flex-1 flex-col ${scrollable ? '' : 'overflow-hidden'}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
