'use client'

import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { isValidElement } from 'react'
import { PlayerStats } from '../Shared/components/PlayerStats'

interface GameHeaderProps {
  /** Icon to display */
  icon?: LucideIcon | ReactNode
  /** Main title */
  title: string
  /** Subtitle (optional) */
  subtitle?: string
  /** Custom left content (replaces icon/title) */
  leftContent?: ReactNode
  /** Custom right content (replaces settings menu) */
  rightContent?: ReactNode
  /** Character ID for displaying player stats */
  characterId?: string
  /** Back link configuration */
  backLink?: {
    href: string
    label?: string
  }
}

/**
 * Unified header component for all game screens
 * Consistent styling, settings menu, responsive layout
 */
export function GameHeader({
  icon: Icon,
  title,
  subtitle,
  leftContent,
  rightContent,
  characterId,
  backLink,
}: GameHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex w-full items-center justify-between gap-3 px-3 py-2">
      {/* Left - Title/Icon or Custom Content */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {leftContent || (
          <div className="flex min-w-0 items-center gap-2">
            {backLink && (
              <Link
                href={backLink.href as any}
                className="mr-2 flex items-center gap-2 text-sm text-[#d4a574] hover:text-[#ffd700]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{backLink.label || 'Zpět'}</span>
              </Link>
            )}

            {Icon &&
              (isValidElement(Icon) ? (
                <div className="h-5 w-5 shrink-0 text-[#ffd700] [&>svg]:h-full [&>svg]:w-full">
                  {Icon}
                </div>
              ) : (
                (() => {
                  const LucideIcon = Icon as LucideIcon
                  return <LucideIcon className="h-5 w-5 shrink-0 text-[#ffd700]" />
                })()
              ))}
            <div className="min-w-0">
              <h1
                className="truncate text-lg text-[#ffd700]"
                style={{ fontFamily: 'var(--font-fantasy)' }}
              >
                {title}
              </h1>
              {subtitle && <p className="truncate text-xs text-[#d4a574]">{subtitle}</p>}
            </div>
          </div>
        )}

        {/* Player Stats */}
        {characterId && <PlayerStats characterId={characterId} />}
      </div>

      {/* Right - Logout or Custom Content */}
      {rightContent || (
        <div className="flex items-center gap-2">
          {/* Logout Button */}
          <button
            onClick={() => router.push('/login')}
            aria-label="Odhlásit se z hry"
            className="flex items-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-3 py-1.5 transition-colors hover:border-[#ff6b6b] hover:bg-[#ff6b6b]/10 focus-visible:ring-2 focus-visible:ring-[#ff6b6b]"
          >
            <LogOut className="h-4 w-4 text-[#ff6b6b]" />
            <span className="hidden text-sm text-[#ff6b6b] sm:inline">Odhlásit</span>
          </button>
        </div>
      )}
    </div>
  )
}
