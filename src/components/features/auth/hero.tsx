import { VStack } from '@/components/ui/core/stack'
import { LogoIcon } from '@/components/ui/icons'
import { HeroTitle, HeroSubtitle, HeroDescription } from '@/components/ui/prefabs/hero-elements'

export function AuthHero() {
  return (
    <VStack align="center" gap="sm">
      <LogoIcon />
      
      <VStack align="center" gap="xs">
        <HeroTitle>Land of Machala</HeroTitle>
        <HeroSubtitle>Vytvoř si nový účet</HeroSubtitle>
        <HeroDescription>Tvá legenda čeká na sepsání...</HeroDescription>
      </VStack>
    </VStack>
  )
}
