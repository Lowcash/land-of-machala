import { forwardRef } from 'react'
import type { ReactNode } from 'react'

import { Stack, type StackProps } from '@/components/ui/core/stack'

export interface AuthGridProps extends StackProps {
  children: ReactNode
}

/**
 * AuthGrid – semantic prefab for the 2-column Auth layout.
 * (Hero + Card | Info/Quote/Footer)
 */
export const AuthGrid = forwardRef<HTMLElement, AuthGridProps>(({ children, ...props }, ref) => {
  return (
    <Stack
      ref={ref}
      gap="xl"
      fullWidth
      align="end"
      justify="center"
      md={{ direction: 'row' }}
      {...props}
    >
      {children}
    </Stack>
  )
})

AuthGrid.displayName = 'AuthGrid'
