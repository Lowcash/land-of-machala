import { forwardRef } from 'react'
import type { ReactNode } from 'react'

import { Stack, type StackProps } from '@/components/ui/core/stack'

export interface CreationGridProps extends StackProps {
  children: ReactNode
}

/**
 * CreationGrid – semantic prefab for the 3-column creation layout.
 * (Identity | Selection | Selection)
 */
export const CreationGrid = forwardRef<HTMLElement, CreationGridProps>(
  ({ children, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        display="grid"
        cols="1"
        gap="md"
        fullWidth
        md={{ cols: '3', maxWidth: '5xl', height: 'creation' }}
        minHeight="zero"
        height="auto"
        {...props}
      >
        {children}
      </Stack>
    )
  }
)

CreationGrid.displayName = 'CreationGrid'
