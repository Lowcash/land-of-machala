import { AnimatePresence } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

import { FadeIn } from '@/components/ui/core/animations/fade-in'
import { VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

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
    <AnimatePresence>
      <FadeIn duration={0.8}>
        <VStack align="center" gap="none" pt="xs" flex="none">
          <Icon size={14} className="text-(--color-primary)/60" />
          <Text variant="small" color="secondary" font="fantasy" className="scale-90 opacity-60">
            {children}
          </Text>
        </VStack>
      </FadeIn>
    </AnimatePresence>
  )
}
