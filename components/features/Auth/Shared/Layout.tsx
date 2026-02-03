import type { ReactNode } from 'react'

import { TransitionWrapper } from '@/components/layout/TransitionWrapper'
import { Stack, VStack } from '@/components/ui/stack'

interface LayoutProps {
  children: ReactNode
  backgroundImage?: string
  centered?: boolean
}

export function Layout({
  children,
  backgroundImage = '/images/login-bg.webp',
  centered = true,
}: LayoutProps) {
  return (
    <TransitionWrapper>
      <VStack
        bg="game-wood-dark"
        position="relative"
        minH="screen"
        fullWidth
        overflowX="hidden"
        _internalClassName="bg-noise"
      >
        {/* Background Image Layer */}
        <Stack position="absolute" inset="0" z="0">
          <Stack position="absolute" inset="0" bg="black-60" z="0" />
          <Stack
            position="absolute"
            inset="0"
            _internalClassName="bg-cover bg-center bg-no-repeat"
            _internalStyle={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <Stack
            position="absolute"
            inset="0"
            _internalClassName="bg-linear-to-b from-black/85 via-black/90 to-black/95"
          />
        </Stack>

        {/* Content Layer */}
        <VStack
          position="relative"
          z="10"
          minH="screen"
          fullWidth
          p="md"
          justify={centered ? 'center' : 'start'}
          align="center"
        >
          {children}
        </VStack>
      </VStack>
    </TransitionWrapper>
  )
}
