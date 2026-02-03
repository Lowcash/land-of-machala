import type { ReactNode } from 'react'

import { VStack } from '@/components/ui/stack'

interface CanvasPanelProps {
  children: ReactNode
  className?: string
}

export function CanvasPanel({ children, className = '' }: CanvasPanelProps) {
  return (
    <VStack
      position="relative"
      overflow="hidden"
      rounded="lg"
      border="game"
      h="full"
      w="full"
      bg="black-80"
      backdrop
      _internalClassName={className}
    >
      <VStack position="relative" flex="1" overflow="hidden">
        {children}
      </VStack>
    </VStack>
  )
}
