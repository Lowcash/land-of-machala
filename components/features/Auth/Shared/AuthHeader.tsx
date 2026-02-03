'use client'

import { useEffect, useState } from 'react'

import { Sparkles, Swords } from 'lucide-react'

import { FLAVOR_TEXTS } from '@/lib/constants/auth-texts'

import { HStack, Stack, VStack } from '@/components/ui/stack'
import { LogoTitle, MutedText, Span } from '@/components/ui/typography'

/**
 * Shared header for authentication pages (Login, Register).
 * Contains the logo, game title, and random flavor text.
 */
export function AuthHeader() {
  const [flavorText, setFlavorText] = useState<string>(FLAVOR_TEXTS[0]!)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFlavorText(FLAVOR_TEXTS[Math.floor(Math.random() * FLAVOR_TEXTS.length)] ?? FLAVOR_TEXTS[0]!)
  }, [])

  if (!mounted) {
    // Return a stable initial state for SSR to avoid hydration mismatch
    return <AuthHeaderContent flavor={FLAVOR_TEXTS[0]!} />
  }

  return <AuthHeaderContent flavor={flavorText} />
}

function AuthHeaderContent({ flavor }: { flavor: string }) {
  return (
    <VStack align="center" gap="md" mb="xl">
      {/* Animated Logo */}
      <Stack position="relative" display="flex" align="center" justify="center">
        <Stack
          position="absolute"
          inset="0"
          rounded="full"
          bg="gold"
          opacity="20"
          _internalClassName="blur-2xl"
        />
        <VStack
          position="relative"
          rounded="full"
          p="md"
          border="gold"
          bg="black-40"
          backdrop
          _internalClassName="shadow-2xl"
        >
          <Swords className="text-game-gold h-12 w-12" />
        </VStack>
      </Stack>

      <VStack gap="sm" align="center" fullWidth>
        {/* Game Title */}
        <LogoTitle>Land of Machala</LogoTitle>

        {/* Subtitle */}
        <HStack gap="sm" justify="center">
          <Sparkles className="text-game-gold-muted h-3 w-3" />
          <Span color="copper">Textová fantasy hra</Span>
          <Sparkles className="text-game-gold-muted h-3 w-3" />
        </HStack>

        {/* Flavor Text */}
        <VStack flex="none" _internalClassName="min-h-[20px] italic">
          <MutedText>{flavor}</MutedText>
        </VStack>
      </VStack>
    </VStack>
  )
}
