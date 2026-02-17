import { type LucideIcon } from 'lucide-react'

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
    <VStack align="center" gap="none" pt="xs" flex="none">
      <Icon 
        size={14} 
        // We use the hex or variable directly in the component specifically designed for this
        // but exposed as a prefab so the caller doesn't need className.
        className="text-(--color-primary)/60" 
      />
      <Text 
        variant="small" 
        color="secondary" 
        font="fantasy" 
        // Encapsulating the scale/opacity here satisfies the "no className in feature components" rule
        className="scale-90 opacity-60"
      >
        {children}
      </Text>
    </VStack>
  )
}
