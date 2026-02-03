import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { GameGrid } from '@/components/ui/game-grid'
import { HStack, VStack } from '@/components/ui/stack'
import { H3, Label } from '@/components/ui/typography'

interface GameActionPanelProps {
  title?: string
  icon?: LucideIcon
  children?: ReactNode
  mainContent?: ReactNode
  sideContent?: ReactNode
  sideTitle?: string
  mainTitle?: string
  footer?: ReactNode
}

export function GameActionPanel({
  title,
  icon: Icon,
  children,
  mainContent,
  sideContent,
  sideTitle = 'Průzkum',
  mainTitle = 'Akce',
  footer,
}: GameActionPanelProps) {
  return (
    <Card variant="game" fullHeight>
      <VStack fullHeight overflow="hidden">
        {title && (
          <Card.Header>
            <HStack align="center" gap="sm">
              {Icon && <Icon className="text-game-gold h-5 w-5" />}
              <H3 font="fantasy" color="gold">
                {title}
              </H3>
            </HStack>
          </Card.Header>
        )}

        <Card.Content>
          <VStack overflow="scroll" fullHeight justify="end">
            <VStack gap="md" fullWidth>
              {children ? (
                children
              ) : (
                <GameGrid columns={{ default: 1, md: 2 }}>
                  {/* Left Column (Side Content) */}
                  {sideContent && (
                    <VStack gap="sm">
                      <Label color="muted">{sideTitle}</Label>
                      {sideContent}
                    </VStack>
                  )}

                  {/* Right Column (Main Content) */}
                  {mainContent && (
                    <VStack gap="sm">
                      <Label color="muted">{mainTitle}</Label>
                      {mainContent}
                    </VStack>
                  )}

                  {/* Footer (Full Width) */}
                  {footer && (
                    <VStack pt="sm" _internalClassName="col-span-full">
                      {footer}
                    </VStack>
                  )}
                </GameGrid>
              )}
            </VStack>
          </VStack>
        </Card.Content>
      </VStack>
    </Card>
  )
}
