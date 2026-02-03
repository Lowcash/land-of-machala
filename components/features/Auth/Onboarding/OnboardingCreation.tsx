import { type classes, type races } from '@/lib/game/onboarding'

import { GameGrid } from '@/components/ui/game-grid'
import { VStack } from '@/components/ui/stack'
import { MedievalTitle, P } from '@/components/ui/typography'

import { Layout } from '../Shared/Layout'
import { ClassSelector } from './Creation/ClassSelector'
import { NameForm } from './Creation/NameForm'
import { RaceSelector } from './Creation/RaceSelector'
import { StatsDisplay } from './Creation/StatsDisplay'

export interface CharacterStats {
  hp: number
  hpMax: number
  mana: number
  manaMax: number
  strength: number
  intelligence: number
  agility: number
  stamina: number
}

type RaceData = (typeof races)[number]
type ClassData = (typeof classes)[number]

interface OnboardingCreationProps {
  race: RaceData
  characterClass: ClassData
  finalStats: CharacterStats
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function OnboardingCreation({
  race,
  characterClass,
  finalStats,
  searchParams,
}: OnboardingCreationProps) {
  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg" centered={false}>
      <VStack
        fullHeight
        fullWidth
        align="center"
        overflow="scroll"
        p="sm"
        _internalClassName="scrollbar-custom relative z-10"
      >
        <VStack maxW="4xl" py="lg" gap="xl" fullWidth>
          <VStack align="center" gap="xs" fullWidth>
            <MedievalTitle size="lg">Vytvoř svého hrdinu</MedievalTitle>
            <P color="gold-muted">Tvá legenda začíná v zemi Machala</P>
          </VStack>

          <GameGrid columns={{ default: 1, lg: 3 }} fullHeight={false} className="lg:items-start">
            <VStack gap="md" fullWidth>
              <NameForm race={race.id} characterClass={characterClass.id} />
              <StatsDisplay race={race} classData={characterClass} finalStats={finalStats} />
            </VStack>

            {/* Mobile Selectors */}
            <VStack display="hidden-lg" gap="md" fullWidth>
              <RaceSelector selectedId={race.id} searchParams={searchParams} isMobile={true} />
              <ClassSelector
                selectedId={characterClass.id}
                searchParams={searchParams}
                isMobile={true}
              />
            </VStack>

            {/* Desktop Selectors (Race) */}
            <VStack display="none-lg" fullWidth>
              <RaceSelector selectedId={race.id} searchParams={searchParams} />
            </VStack>

            {/* Desktop Selectors (Class) */}
            <VStack display="none-lg" fullWidth>
              <ClassSelector selectedId={characterClass.id} searchParams={searchParams} />
            </VStack>
          </GameGrid>
        </VStack>
      </VStack>
    </Layout>
  )
}
