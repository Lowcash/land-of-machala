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

import { StepCreation } from './step-creation'
import { PrologueStep } from './step-prologue'

export type OriginsViewProps = {
  initialPhase?: 'creation' | 'prologue'
  onComplete?: (hero: HeroSummary) => void
}

type OriginsPhase = 'creation' | 'prologue'

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

function createInitialState(initialPhase: OriginsPhase): OriginsViewState {
  return {
    phase: initialPhase,
    selectedChoiceId: initialPhase === 'creation' ? ORIGINS_STEP.choices[0].id : null,
    hero: {
      classId: DEFAULT_ORIGIN_CLASS_ID,
      name: DEFAULT_HERO_NAME,
      raceId: DEFAULT_ORIGIN_RACE_ID,
    },
  }
}

export function OriginsViewClient({ initialPhase = 'prologue', onComplete }: OriginsViewProps) {
  const [state, setState] = useState<OriginsViewState>(() => createInitialState(initialPhase))

  function moveToCreation(choiceId?: string | null) {
    setState((previous) => {
      const resolvedChoiceId = choiceId ?? previous.selectedChoiceId
      const choice = ORIGINS_STEP.choices.find((item) => item.id === resolvedChoiceId)

      if (!choice) {
        return {
          ...previous,
          phase: 'creation',
          selectedChoiceId: resolvedChoiceId,
        }
      }

      return {
        ...previous,
        phase: 'creation',
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

    setState((previous) => ({
      ...previous,
      hero: {
        classId: randomClass.id,
        name: randomName,
        raceId: randomRace.id,
      },
    }))
  }

  function finishOrigins() {
    if (!state.hero.name.trim()) {
      return
    }

    onComplete?.(buildHeroSummary(state.hero.name.trim(), state.hero.raceId, state.hero.classId))
  }

  return (
    <CenteredStageShell>
      {state.phase === 'prologue' ? (
        <PrologueStep
          onContinue={() => moveToCreation(state.selectedChoiceId)}
          onSelectChoice={(choiceId) =>
            setState((previous) => ({ ...previous, selectedChoiceId: choiceId }))
          }
          onSkip={() => moveToCreation(null)}
          selectedChoiceId={state.selectedChoiceId}
          step={ORIGINS_STEP}
        />
      ) : (
        <StepCreation
          canFinish={state.hero.name.trim().length > 0}
          classes={CLASS_OPTIONS}
          heroName={state.hero.name}
          onBack={() => setState((previous) => ({ ...previous, phase: 'prologue' }))}
          onClassSelect={(classId) =>
            setState((previous) => ({
              ...previous,
              hero: { ...previous.hero, classId },
            }))
          }
          onFinish={finishOrigins}
          onNameChange={(name) =>
            setState((previous) => ({
              ...previous,
              hero: { ...previous.hero, name },
            }))
          }
          onRaceSelect={(raceId) =>
            setState((previous) => ({
              ...previous,
              hero: { ...previous.hero, raceId },
            }))
          }
          onRandomize={randomizeHero}
          races={RACE_OPTIONS}
          selectedClassId={state.hero.classId}
          selectedRaceId={state.hero.raceId}
          stats={resolveHeroStats(state.hero.raceId, state.hero.classId)}
        />
      )}
    </CenteredStageShell>
  )
}
