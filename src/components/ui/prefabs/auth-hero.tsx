import * as React from 'react'
import { Heading, Text } from '@/components/ui/core/typography'
import { VStack } from '@/components/ui/core/stack'
import { SparklesIcon } from '@/components/ui/icons'

export function AuthHero() {
  return (
    <div className="mb-8">
      <VStack align="center" gap="xs">
        <Heading
        level="h1"
        font="medieval"
        color="gold"
        className="mb-2 text-3xl whitespace-nowrap sm:text-4xl lg:text-5xl"
        style={{
          textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
        }}
      >
        Land of Machala
      </Heading>

      <div className="mb-2 flex items-center justify-center gap-2">
        <SparklesIcon />
        <Text color="secondary" className="text-sm sm:text-base">
          Vytvoř si nový účet
        </Text>
        <SparklesIcon />
      </div>

      <Text 
        variant="muted" 
        className="mt-2 text-xs italic sm:text-sm text-[#8b7355]"
      >
        Tvá legenda čeká na sepsání...
      </Text>
      </VStack>
    </div>
  )
}
