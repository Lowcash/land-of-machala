import * as React from 'react'

import { HStack, VStack } from './stack'

interface InfoBarProps {
  children: React.ReactNode
}

export function InfoBar({ children }: InfoBarProps) {
  return (
    <VStack
      border="game-b"
      bg="black-40"
      px="md"
      py="sm"
      backdrop
      fullWidth
      _internalClassName="z-10"
    >
      <HStack align="center" justify="between" fullWidth>
        {children}
      </HStack>
    </VStack>
  )
}
