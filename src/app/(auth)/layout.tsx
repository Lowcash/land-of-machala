import * as React from 'react'

import { Stack, VStack } from '@/components/ui/core/stack'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      fullHeight
      justify="center"
      align="center"
      px="md"
      py="xl"
      md={{ px: 'lg' }}
      lg={{ p: 'xl' }}
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
