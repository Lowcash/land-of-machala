import { Sparkles, Swords } from 'lucide-react'

import { HStack, VStack } from '@/components/ui/stack'
import { LogoTitle, MutedText, P } from '@/components/ui/typography'

interface BrandProps {
  className?: string
  heroText: string
}

export function Brand({ className = '', heroText }: BrandProps) {
  return (
    <VStack pt="md" className={className} align="center" gap="lg" fullWidth>
      <VStack align="center" gap="sm" fullWidth>
        <VStack position="relative">
          <VStack
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
            border="gold"
            p="md"
            bg="game-wood-dark"
            _internalClassName="shadow-2xl"
          >
            <Swords className="text-game-gold h-10 w-10" />
          </VStack>
        </VStack>

        <VStack align="center" gap="xs" fullWidth>
          <LogoTitle>Land of Machala</LogoTitle>

          <HStack align="center" gap="sm">
            <Sparkles className="text-game-copper h-3 w-3" />
            <P color="gold-muted">Textová fantasy hra</P>
            <Sparkles className="text-game-copper h-3 w-3" />
          </HStack>
        </VStack>

        <VStack maxW="xs">
          <MutedText italic align="center">
            {heroText}
          </MutedText>
        </VStack>
      </VStack>
    </VStack>
  )
}
