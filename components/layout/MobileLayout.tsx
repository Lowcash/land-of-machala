'use client'

import type { ReactNode } from 'react'

import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface MobileLayoutProps {
  /** Is overlay visible */
  isOpen: boolean
  /** Title text */
  title: string
  /** Content */
  children: ReactNode
  /** Close handler */
  onClose: () => void
  /** Custom back button text */
  backText?: string
  /** Custom className */
  className?: string
}

/**
 * Mobile fullscreen overlay for detail views
 * Replaces repeated fixed inset-0 patterns
 */
export function MobileLayout({
  isOpen,
  title,
  children,
  onClose,
  backText = 'Zpět',
  className = '',
}: MobileLayoutProps) {
  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-black/95 pt-11.75 backdrop-blur-md md:hidden ${className}`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-[#8b6f47] bg-black/80 px-3 py-3 backdrop-blur-md">
        <h2
          className="text-base text-[#ffd700] sm:text-lg"
          style={{ fontFamily: 'var(--font-medieval)' }}
        >
          {title}
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          className="min-h-touch-target flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-2 transition-colors hover:border-[#ffd700] sm:min-h-0"
          aria-label="Zavřít"
        >
          <ArrowLeft className="h-4 w-4 text-[#d4a574]" />
          <span className="text-sm text-[#d4a574]">{backText}</span>
        </Button>
      </div>

      <div className="scrollbar-custom flex-1 overflow-y-auto p-3 sm:p-4">{children}</div>
    </div>
  )
}
