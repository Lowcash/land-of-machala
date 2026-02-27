import React from 'react'

import { Stack } from '@/components/ui/core/stack'

export interface FeatureLayoutProps {
  /**
   * The variant determines the default padding and gap rules.
   * - `standard`: default screen layout.
   * - `focused`: typically used for single centralized dialogs/wizards.
   */
  variant?: 'standard' | 'focused'
  children?: React.ReactNode
}

/**
 * The highest-level container for a feature screen.
 * Bakes in fullWidth, fullHeight, and standard responsive padding/gaps.
 */
export const FeatureLayout = React.forwardRef<HTMLElement, FeatureLayoutProps>(
  ({ variant = 'standard', children }, ref) => {
    const isFocused = variant === 'focused'

    return (
      <Stack
        ref={ref}
        direction="col" // Pages default to vertical flow
        fullWidth
        fullHeight
        p="md"
        md={isFocused ? { p: 'lg', align: 'center', justify: 'center' } : { p: 'lg' }}
        gap={isFocused ? 'xl' : 'lg'}
        align="stretch"
        justify="start"
      >
        {children}
      </Stack>
    )
  }
)

FeatureLayout.displayName = 'FeatureLayout'
