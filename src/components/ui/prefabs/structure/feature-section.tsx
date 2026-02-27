import { forwardRef } from 'react'

import { type StackProps, VStack } from '@/components/ui/core/stack'

export interface FeatureSectionProps extends Pick<
  StackProps,
  'display' | 'md' | 'sm' | 'height' | 'minHeight' | 'justify' | 'align' | 'gap' | 'p'
> {
  children?: React.ReactNode
}

/**
 * A standard vertical section within a page or feature.
 * Bakes in `VStack` behavior, `fullWidth`, and a standard section gap (`gap="md"`).
 */
export const FeatureSection = forwardRef<HTMLElement, FeatureSectionProps>(
  ({ children, ...props }, ref) => {
    return (
      <VStack ref={ref} fullWidth gap="md" {...props}>
        {children}
      </VStack>
    )
  }
)

FeatureSection.displayName = 'FeatureSection'
