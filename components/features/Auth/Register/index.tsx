import { Sparkles } from 'lucide-react'

import { HERO_TEXTS } from '@/lib/game/constants/texts'

import { VStack } from '@/components/ui/stack'
import { Label } from '@/components/ui/typography'

import { AuthPageTemplate } from '../Shared/AuthPageTemplate'
import { Brand } from '../Shared/Brand'
import { LoreQuote } from '../Shared/LoreQuote'
import { FeatureList } from './FeatureList'
import { RegisterForm } from './RegisterForm'

export function Register() {
  const randomHeroText = HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] || HERO_TEXTS[0]
  const randomQuote = HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] || HERO_TEXTS[0]

  return (
    <AuthPageTemplate
      backgroundImage="/assets/locations/city-background.jpg"
      sideContent={
        <VStack gap="md" fullWidth>
          <FeatureList />
          <LoreQuote text={randomQuote} />
        </VStack>
      }
    >
      <VStack fullWidth gap="lg">
        <Brand heroText={randomHeroText} />
        <RegisterForm />

        {/* Mobile Info Accordion */}
        <VStack display="hidden-lg" fullWidth>
          <details className="group w-full">
            <summary className="border-game-copper/30 text-game-gold hover:bg-game-copper/10 flex cursor-pointer list-none items-center gap-2 rounded-lg border bg-black/80 px-4 py-3 transition-colors">
              <Sparkles className="h-4 w-4" />
              <Label font="fantasy">Začni své dobrodružství</Label>
            </summary>
            <VStack
              mt="xs"
              rounded="md"
              border="copper"
              bg="black-80"
              p="md"
              _internalClassName="text-xs leading-relaxed text-game-gold/70"
            >
              Registrací získáš přístup do světa Machala, kde můžeš vytvořit svého hrdinu, bojovat s
              monstry a získávat legendární předměty.
            </VStack>
          </details>
        </VStack>
      </VStack>
    </AuthPageTemplate>
  )
}
