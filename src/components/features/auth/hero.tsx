import { Heading, Text } from '@/components/ui/core/typography'
import { VStack, HStack } from '@/components/ui/core/stack'
import { SparklesIcon } from '@/components/ui/icons'
import { Logo } from '@/components/ui/prefabs/logo'

export function AuthHero() {
  return (
    <VStack align="center" gap="sm">
      <Logo />
      
      <Heading
        level="h1"
        font="medieval"
        color="gold"
        className="text-3xl whitespace-nowrap sm:text-4xl lg:text-5xl"
        style={{
          textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
        }}
      >
        Land of Machala
      </Heading>

      <HStack align="center" justify="center" gap="xs">
        <SparklesIcon />
        <Text color="secondary" className="text-sm sm:text-base">
          Vytvoř si nový účet
        </Text>
        <SparklesIcon />
      </HStack>

      <Text 
        variant="muted" 
        className="text-xs italic sm:text-sm text-[#8b7355]"
      >
        Tvá legenda čeká na sepsání...
      </Text>
    </VStack>
  )
}
