import type { ReactNode } from 'react'
import { isValidElement } from 'react'

import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'

import type { AppRoute } from '@/lib/types/game'

import { LogoutButton } from '@/components/features/Auth/LogoutButton'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, GoldTitle, Span } from '@/components/ui/typography'

import { PlayerStats } from './PlayerStats'

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
  playerStats,
  backLink,
}: GameHeaderProps) {
  return (
    <VStack px="sm" py="xs" fullWidth>
      <HStack align="center" justify="between" gap="md" fullWidth>
        {/* Left - Title/Icon or Custom Content */}
        <HStack flex="1" align="center" gap="md">
          <HStack align="center" gap="lg" fullWidth>
            {leftContent || (
              <HStack align="center" gap="sm">
                {backLink && (
                  <Link
                    href={backLink.href}
                    className="group mr-2 flex items-center gap-2"
                    aria-label={backLink.label || 'Zpět'}
                  >
                    <ArrowLeft className="text-game-gold group-hover:text-game-gold-muted h-4 w-4 transition-colors" />
                    <VStack _internalClassName="hidden sm:inline group-hover:text-game-gold transition-colors hover:underline">
                      <Span color="copper">{backLink.label || 'Zpět'}</Span>
                    </VStack>
                  </Link>
                )}

                {Icon &&
                  (isValidElement(Icon) ? (
                    <VStack
                      shrink="0"
                      _internalClassName="h-5 w-5 text-game-gold [&>svg]:h-full [&>svg]:w-full"
                    >
                      {Icon}
                    </VStack>
                  ) : (
                    (() => {
                      const LucideIconComp = Icon as LucideIcon
                      return (
                        <VStack shrink="0" _internalClassName="text-game-gold">
                          <LucideIconComp className="h-5 w-5" />
                        </VStack>
                      )
                    })()
                  ))}
                <VStack gap="none" flex="1">
                  <VStack leading="none">
                    <GoldTitle as="h1" truncate>
                      {title}
                    </GoldTitle>
                  </VStack>
                  {subtitle && (
                    <VStack mt="xs" _internalClassName="block">
                      <Caption color="copper" truncate>
                        {subtitle}
                      </Caption>
                    </VStack>
                  )}
                </VStack>
              </HStack>
            )}

            {/* Player Stats */}
            {playerStats && <PlayerStats {...playerStats} />}
          </HStack>
        </HStack>

        {/* Right - Logout or Custom Content */}
        {rightContent || (
          <HStack align="center" gap="sm" shrink="0">
            <LogoutButton />
          </HStack>
        )}
      </HStack>
    </VStack>
  )
}
