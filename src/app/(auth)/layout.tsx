import * as React from 'react'

import { Stack, VStack } from '@/components/ui/core/stack'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <VStack fullHeight justify="center" align="center" p="xl">
      <Stack
        fullWidth
        maxWidth="5xl"
        gap="xxl"
        align="end"
        justify="center"
        lg={{ direction: 'row' }}
      >
        {children}
      </Stack>
    </VStack>
  )
}
