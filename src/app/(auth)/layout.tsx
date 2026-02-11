import * as React from 'react'

import { Stack, VStack } from '@/components/ui/core/stack'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      justify="center"
      align="center"
      p="md"
      md={{ p: 'xl' }}
      className="min-h-dvh"
    >
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
