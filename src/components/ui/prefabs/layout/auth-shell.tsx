import type { ReactNode } from 'react'

import { Stack } from '@/components/ui/core/stack'

interface AuthShellProps {
  children: ReactNode
}

/**
 * AuthShell provides a standardized layout for authentication and onboarding screens.
 * It centers content using a scrollable Stack and wraps everything in RootShell.
 */
export function AuthShell({ children }: AuthShellProps) {
  return (
    <Stack
      fullWidth
      flex="1"
      justify="center"
      align="center"
      p="md"
      md={{ p: 'lg' }}
      overflow="auto"
    >
      <Stack fullWidth maxWidth="5xl">
        {children}
      </Stack>
    </Stack>
  )
}
