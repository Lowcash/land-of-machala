import { type LucideIcon } from 'lucide-react'

import { VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { FadeIn, Presence } from '@/components/ui/prefabs/animations/motion-prefabs'

interface FormationStatusProps {
  icon: LucideIcon
  children: React.ReactNode
}

/**
 * A decorative status indicator for character formation steps.
 * Encapsulates subtle styling (muted primary color, fantasy font, specific alignment)
 * to avoid ad-hoc styling in feature components.
 */
export function FormationStatus({ icon: Icon, children }: FormationStatusProps) {
  return (
    <Presence>
      <FadeIn duration={0.8}>
        <VStack align="center" gap="none" pt="xs" flex="none">
          <Icon size={14} color="secondary" />
          <Text variant="tiny" color="secondary" align="center" font="fantasy">
            {children}
          </Text>
        </VStack>
      </FadeIn>
    </Presence>
  )
}
