import type { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/stack'
import { Caption, SectionHeading } from '@/components/ui/typography'

interface LocationLayoutProps {
  /** Optional title for the location info box */
  title?: string
  /** Optional lore or description text in italics */
  description?: string | ReactNode
  /** Main content of the location */
  children: ReactNode
}

/**
 * Shared layout for all location action views (Town, Bank, Shops, etc.)
 * Provides a consistent info card at the top and standard spacing.
 */
export function LocationLayout({ title, description, children }: LocationLayoutProps) {
  return (
    <VStack gap="md" fullWidth>
      {(title || description) && (
        <Card variant="muted" fullWidth>
          <Card.Content>
            <VStack gap="none">
              {title && <SectionHeading>{title}</SectionHeading>}
              {description && typeof description === 'string' ? (
                <VStack leading="relaxed">
                  <Caption color="muted" italic>
                    &quot;{description}&quot;
                  </Caption>
                </VStack>
              ) : (
                description
              )}
            </VStack>
          </Card.Content>
        </Card>
      )}
      <VStack gap="md" fullWidth>
        {children}
      </VStack>
    </VStack>
  )
}
