import React from 'react'

import { Stack } from '@/components/ui/core/stack'

export interface ActionGroupProps {
  children?: React.ReactNode
}

/**
 * A standard container for buttons or actions, usually pinned to the bottom of a form or card.
 * Bakes in: Responsive direction (`VStack` on mobile, `HStack` on desktop with `justify="end"`), standard `gap="sm"`.
 */
export const ActionGroup = React.forwardRef<HTMLElement, ActionGroupProps>(({ children }, ref) => {
  return (
    <Stack
      ref={ref}
      direction="col" // Mobile defaults to vertical stacking
      md={{ direction: 'row', justify: 'end' }} // Desktop standardizes to right-aligned row
      gap="sm"
      fullWidth
    >
      {children}
    </Stack>
  )
})

ActionGroup.displayName = 'ActionGroup'
