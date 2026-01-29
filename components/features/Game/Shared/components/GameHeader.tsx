import type { ReactNode } from 'react'
import { isValidElement } from 'react'

import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'

import type { AppRoute } from '@/lib/types/game'

import { LogoutButton } from '@/components/features/Auth/LogoutButton'

import { PlayerStats } from './PlayerStats'

// Valid routes are now defined in @/lib/types/game.ts

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
  characterId?: string // Kept for backward compat if needed, but preferred below
  playerStats?: {
    gold: number
    x: number
    y: number
  }
  backLink?: {
    href: AppRoute
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
  // characterId, // Deprecated
  playerStats,
  backLink,
}: GameHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3 px-3 py-2">
      {/* Left - Title/Icon or Custom Content */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {leftContent || (
          <div className="flex min-w-0 items-center gap-2">
            {backLink && (
              <Link
                href={backLink.href}
                className="mr-2 flex items-center gap-2 text-sm text-[#d4a574] hover:text-[#ffd700]"
                aria-label={backLink.label || 'Zpět'}
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
                  const LucideIconComp = Icon as LucideIcon
                  return <LucideIconComp className="h-5 w-5 shrink-0 text-[#ffd700]" />
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
        {/* Player Stats */}
        {playerStats && <PlayerStats {...playerStats} />}
      </div>

      {/* Right - Logout or Custom Content */}
      {rightContent || (
        <div className="flex items-center gap-2">
          {/* Logout Button */}
          <LogoutButton />
        </div>
      )}
    </div>
  )
}
