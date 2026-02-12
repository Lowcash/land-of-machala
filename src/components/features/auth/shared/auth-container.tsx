import * as React from 'react'

import { Stack, VStack } from '@/components/ui/core/stack'

interface AuthContainerProps {
  children: React.ReactNode
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <VStack minHeight="dvh" fullWidth justify="center" align="center" p="md" md={{ p: 'xl' }}>
      <Stack
        fullWidth
        maxWidth="5xl"
        gap="xl"
        align="end"
        justify="center"
        lg={{ direction: 'row' }}
      >
        {children}
      </Stack>
    </VStack>
  )
}
