'use client'

import { useState } from 'react'

import {
  CLASS_OPTIONS,
  type ClassOption,
  DEFAULT_HERO_NAME,
  DEFAULT_ORIGIN_CLASS_ID,
  DEFAULT_ORIGIN_RACE_ID,
  type HeroSummary,
  ORIGINS_STEP,
  RACE_OPTIONS,
  type RaceOption,
  buildHeroSummary,
  getRandomHeroName,
  resolveHeroStats,
} from '@/lib/auth/demo-data'

import { CenteredStageShell } from '@/components/ui/prefabs/layout/centered-stage-shell'

import { PrologueStep } from './step-prologue'
import { StepSetup } from './step-setup'

type OriginsPhase = 'prologue' | 'setup'

export type OriginsViewProps = {
  initialPhase?: OriginsPhase
  onComplete?: (hero: HeroSummary) => void
}

type HeroDraft = {
  classId: ClassOption['id']
  name: string
  raceId: RaceOption['id']
}

type OriginsViewState = {
  phase: OriginsPhase
  selectedChoiceId: string | null
  hero: HeroDraft
}

export function OriginsViewClient({ initialPhase = 'prologue', onComplete }: OriginsViewProps) {
  const [state, setState] = useState<OriginsViewState>(() => createInitialState(initialPhase))
  const trimmedHeroName = state.hero.name.trim()
  const canFinish = trimmedHeroName.length > 0
  const heroStats = resolveHeroStats(state.hero.raceId, state.hero.classId)

  function updateHero(patch: Partial<HeroDraft>) {
    setState((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        ...patch,
      },
    }))
  }

  function selectChoice(choiceId: string) {
    setState((previous) => ({ ...previous, selectedChoiceId: choiceId }))
  }

  function returnToPrologue() {
    setState((previous) => ({ ...previous, phase: 'prologue' }))
  }

  function moveToSetup(choiceId?: string | null) {
    setState((previous) => {
      const resolvedChoiceId = choiceId ?? previous.selectedChoiceId
      const choice = ORIGINS_STEP.choices.find((item) => item.id === resolvedChoiceId)

      if (!choice) {
        return {
          ...previous,
          phase: 'setup',
          selectedChoiceId: resolvedChoiceId,
        }
      }

      return {
        ...previous,
        phase: 'setup',
        selectedChoiceId: resolvedChoiceId,
        hero: {
          ...previous.hero,
          classId: choice.suggestedClassId,
          raceId: choice.suggestedRaceId,
        },
      }
    })
  }

  function randomizeHero() {
    const randomRace = RACE_OPTIONS[Math.floor(Math.random() * RACE_OPTIONS.length)]
    const randomClass = CLASS_OPTIONS[Math.floor(Math.random() * CLASS_OPTIONS.length)]
    const randomName = getRandomHeroName()

    updateHero({
      classId: randomClass.id,
      name: randomName,
      raceId: randomRace.id,
    })
  }

  function finishOrigins() {
    if (!trimmedHeroName) {
      return
    }

    onComplete?.(buildHeroSummary(trimmedHeroName, state.hero.raceId, state.hero.classId))
  }

  return (
    <CenteredStageShell>
      {state.phase === 'prologue' ? (
        <PrologueStep
          onContinue={() => moveToSetup(state.selectedChoiceId)}
          onSelectChoice={selectChoice}
          onSkip={() => moveToSetup(null)}
          selectedChoiceId={state.selectedChoiceId}
          step={ORIGINS_STEP}
        />
      ) : (
        <StepSetup
          canFinish={canFinish}
          classes={CLASS_OPTIONS}
          heroName={state.hero.name}
          onBack={returnToPrologue}
          onClassSelect={(classId) => updateHero({ classId })}
          onFinish={finishOrigins}
          onNameChange={(name) => updateHero({ name })}
          onRaceSelect={(raceId) => updateHero({ raceId })}
          onRandomize={randomizeHero}
          races={RACE_OPTIONS}
          selectedClassId={state.hero.classId}
          selectedRaceId={state.hero.raceId}
          stats={heroStats}
        />
      )}
    </CenteredStageShell>
  )
}

function createInitialState(initialPhase: OriginsPhase): OriginsViewState {
  return {
    phase: initialPhase,
    selectedChoiceId: initialPhase === 'setup' ? ORIGINS_STEP.choices[0].id : null,
    hero: {
      classId: DEFAULT_ORIGIN_CLASS_ID,
      name: DEFAULT_HERO_NAME,
      raceId: DEFAULT_ORIGIN_RACE_ID,
    },
  }
}
