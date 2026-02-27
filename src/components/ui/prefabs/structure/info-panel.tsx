import React from 'react'

import { type StackProps, VStack } from '@/components/ui/core/stack'

export interface InfoPanelProps extends StackProps {
  /**
   * The visual style of the panel.
   * - `subtle`: The standard slightly darker background (e.g., secondary with low opacity).
   * - `bordered`: A transparent panel with a subtle border.
   */
  variant?: 'subtle' | 'bordered'
  children?: React.ReactNode
}

/**
 * A standard padded panel used across the app (like `CharacterBox` or `SelectionBox`).
 * Replaces complex nested stacks with a clean API for rendering grouped information.
 */
export const InfoPanel = React.forwardRef<HTMLElement, InfoPanelProps>(
  ({ variant = 'subtle', children, ...props }, ref) => {
    const isSubtle = variant === 'subtle'

    return (
      <VStack
        ref={ref}
        fullWidth
        p="md"
        gap="md"
        rounded="md"
        bgColor={isSubtle ? 'secondary' : undefined}
        opacity={isSubtle ? '10' : undefined} // Typically we use a semi-transparent background for panels
        {...(variant === 'bordered' ? { borderColor: 'secondary', borderWidth: 'px' } : {})}
        {...props}
      >
        {children}
      </VStack>
    )
  }
)

InfoPanel.displayName = 'InfoPanel'
