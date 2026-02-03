import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { GameIcon } from '@/components/ui/display'
import { RichText } from '@/components/ui/rich-text'
import { HStack, VStack } from '@/components/ui/stack'
import { GoldTitle } from '@/components/ui/typography'

interface LocationViewProps {
  title: string
  description: string
  icon?: LucideIcon
  children: ReactNode
  aside?: ReactNode
}

/**
 * Unified Location View - Server Component
 * Standardizes the header and layout for all game locations.
 */
export function LocationView({
  title,
  description,
  icon: Icon,
  children,
  aside,
}: LocationViewProps) {
  return (
    <VStack gap="md" fullWidth>
      <Card variant="muted" fullWidth>
        <Card.Content>
          <HStack align="start" gap="md" fullWidth>
            {Icon && <GameIcon icon={Icon} color="gold" mt="xs" />}
            <VStack flex="1">
              <GoldTitle as="h3" mb="xs">
                {title}
              </GoldTitle>
              <RichText content={description} italic size="sm" color="gold-muted" />
            </VStack>
            {aside}
          </HStack>
        </Card.Content>
      </Card>

      <VStack display="grid" gridCols="1" gap="md" fullWidth>
        {children}
      </VStack>
    </VStack>
  )
}
