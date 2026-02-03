import type { ReactNode } from 'react'

import Image from 'next/image'

import { GameActivityPanel } from '@/components/features/Game/Activity/GameActivityPanel'
import { SplitLayout } from '@/components/layout/SplitLayout'
import { VStack } from '@/components/ui/stack'

import { TransitionWrapper } from './TransitionWrapper'

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
  const maxWidthClass = (
    {
      sm: '4xl',
      md: '5xl',
      lg: '6xl',
      xl: '7xl',
      full: 'none',
    } as const
  )[maxWidth]

  return (
    <TransitionWrapper>
      <VStack position="relative" fullHeight fullWidth _internalClassName={className}>
        {/* Page Background */}
        {backgroundImage && (
          <VStack position="absolute" inset="0" z="below" interactive="none">
            <Image src={backgroundImage} alt="" fill className="object-cover" priority />
            <VStack
              position="absolute"
              inset="0"
              _internalClassName="bg-linear-to-b from-black/50 via-transparent to-black/60"
            />
          </VStack>
        )}

        <VStack fullHeight fullWidth gap="none">
          {/* Header - Constrained */}
          <VStack position="sticky" top="0" z="top" fullWidth interactive="none">
            <VStack px="md" _internalClassName="mx-auto w-full sm:px-6 lg:px-8">
              <VStack maxW={maxWidthClass} _internalClassName="mx-auto" interactive={false}>
                {header}
              </VStack>
            </VStack>
          </VStack>

          {/* Main Content Area - Constrained */}
          <VStack
            position="relative"
            flex="1"
            fullWidth
            px="md"
            _internalClassName="min-h-0 sm:px-6 lg:px-8"
          >
            <VStack maxW={maxWidthClass} fullHeight _internalClassName="mx-auto min-h-full">
              {showInfoLog ? (
                <SplitLayout
                  main={
                    <VStack flex="1" _internalClassName="min-h-0">
                      {children}
                    </VStack>
                  }
                  aside={rightPanel || <GameActivityPanel />}
                  className="h-full"
                  asideWidth="md"
                />
              ) : (
                <VStack fullHeight gap="none" _internalClassName="scrollbar-hide h-full">
                  {children}
                </VStack>
              )}
            </VStack>
          </VStack>

          {/* Footer Area - Constrained */}
          {footer && (
            <VStack
              shrink="0"
              border="game-copper-t"
              bg="black-40"
              py="sm"
              px="md"
              backdrop
              fullWidth
              _internalClassName="sm:px-6 lg:px-8"
            >
              <VStack maxW={maxWidthClass} _internalClassName="mx-auto">
                {footer}
              </VStack>
            </VStack>
          )}
        </VStack>
      </VStack>
    </TransitionWrapper>
  )
}
