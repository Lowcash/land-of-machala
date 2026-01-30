import { type classes, type races } from '@/lib/game/onboarding'

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
      <div className="scrollbar-custom relative z-10 flex min-h-0 flex-1 flex-col items-center overflow-y-auto p-2 sm:p-4">
        <div className="my-auto w-full max-w-6xl py-4 sm:py-8">
          <div className="mb-6 text-center">
            <h1
              className="text-game-gold mb-1 text-2xl sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'var(--font-medieval)',
                textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
              }}
            >
              Vytvoř svého hrdinu
            </h1>
            <p className="text-game-gold-muted text-sm sm:text-base">
              Tvá legenda začíná v zemi Machala
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="space-y-4 lg:col-span-3">
              <NameForm race={race.id} characterClass={characterClass.id} />

              <StatsDisplay race={race} classData={characterClass} finalStats={finalStats} />
            </div>

            <div className="lg:col-span-4 lg:hidden">
              {/* Mobile View: Simple Stack instead of Accordion for Server Component simplicity */}
              <div className="space-y-4">
                <RaceSelector selectedId={race.id} searchParams={searchParams} isMobile={true} />
                <ClassSelector
                  selectedId={characterClass.id}
                  searchParams={searchParams}
                  isMobile={true}
                />
              </div>
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <RaceSelector selectedId={race.id} searchParams={searchParams} />
            </div>

            <div className="hidden lg:col-span-5 lg:block">
              <ClassSelector selectedId={characterClass.id} searchParams={searchParams} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
