import * as React from 'react'

import { Stack, VStack } from '@/components/ui/core/stack'

interface AuthPageLayoutProps {
  children: React.ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
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
