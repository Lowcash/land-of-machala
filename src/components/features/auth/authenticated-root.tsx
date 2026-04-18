'use client'

import { useTransition } from 'react'

import { useRouter } from '@/i18n/routing'

import { CharacterBox } from '@/components/features/game/character-box'
import { Button } from '@/components/ui/core/button'
import { Stack, VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { EntranceStack } from '@/components/ui/prefabs/animations/entrance-stack'
import { BrandedHero } from '@/components/ui/prefabs/layout/branded-hero'
import { NarrativeCard } from '@/components/ui/prefabs/narrative/narrative-card'
import { AuthGrid, FeatureSection } from '@/components/ui/prefabs/structure'
import { Background } from '@/components/ui/shared/background'
import { Footer, type FooterProps } from '@/components/ui/shared/footer'

import { clearRootSessionAction } from '@/app/[locale]/actions/root-session'

export interface AuthenticatedRootProps {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  session: {
    label: string
    value: string
    email?: string
  }
  note: string
  resetLabel: string
  footer: FooterProps
  backgroundSrc: string
  character: {
    name: string
    level: number
    location: string
    gold: number
    hp: number
    hpMax: number
    resource: number
    resourceMax: number
    resourceType: 'mana' | 'energy'
    xp: number
    xpMax: number
    stats: {
      strength: number
      intelligence: number
      agility: number
      stamina: number
    }
  }
}

export function AuthenticatedRoot({
  hero,
  session,
  note,
  resetLabel,
  footer,
  backgroundSrc,
  character,
}: AuthenticatedRootProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleReset = () => {
    startTransition(async () => {
      const result = await clearRootSessionAction()

      if (result.ok) {
        router.refresh()
      }
    })
  }

  return (
    <EntranceStack fullHeight fullWidth py="xl">
      <Background src={backgroundSrc} />

      <AuthGrid>
        <FeatureSection gap="xl">
          <BrandedHero title={hero.title} subtitle={hero.subtitle} description={hero.description} />

          <NarrativeCard variant="primary" gap="md">
            <VStack gap="sm">
              <Text variant="decoration" color="secondary">
                {session.label}
              </Text>
              <Text variant="large" font="fantasy">
                {session.value}
              </Text>
              {session.email ? (
                <Text variant="muted" color="secondary">
                  {session.email}
                </Text>
              ) : null}
              <Text variant="detail">{note}</Text>
            </VStack>

            <Stack direction="col" gap="sm" md={{ direction: 'row' }}>
              <Button variant="secondary" onClick={handleReset} loading={isPending}>
                {resetLabel}
              </Button>
            </Stack>
          </NarrativeCard>
        </FeatureSection>

        <FeatureSection>
          <CharacterBox
            name={character.name}
            level={character.level}
            hp={character.hp}
            hpMax={character.hpMax}
            resource={character.resource}
            resourceMax={character.resourceMax}
            resourceType={character.resourceType}
            xp={character.xp}
            xpMax={character.xpMax}
            gold={character.gold}
            location={character.location}
            stats={character.stats}
          />
          <Footer {...footer} />
        </FeatureSection>
      </AuthGrid>
    </EntranceStack>
  )
}
