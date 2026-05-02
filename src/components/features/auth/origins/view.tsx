'use client'

import { useState } from 'react'

import {
  CLASS_OPTIONS,
  type ClassOption,
  type HeroSummary,
  ORIGINS_STEP,
  RACE_OPTIONS,
  RANDOM_NAMES,
  type RaceOption,
  buildHeroSummary,
  resolveHeroStats,
} from '@/lib/auth/demo-data'

import { CenteredStageShell } from '@/components/ui/prefabs/layout/centered-stage-shell'

import { StepCreation } from './step-creation'
import { TutorialStep } from './step-tutorial'

type OriginsViewProps = {
  initialPhase?: 'creation' | 'prologue'
  onComplete?: (hero: HeroSummary) => void
}

export function OriginsView({ initialPhase = 'prologue', onComplete }: OriginsViewProps) {
  const [phase, setPhase] = useState<'creation' | 'prologue'>(initialPhase)
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(
    initialPhase === 'creation' ? ORIGINS_STEP.choices[0].id : null
  )
  const [selectedRaceId, setSelectedRaceId] = useState<RaceOption['id']>('human')
  const [selectedClassId, setSelectedClassId] = useState<ClassOption['id']>('ranger')
  const [heroName, setHeroName] = useState('Ardyn Vale')

  function moveToCreation(choiceId?: string | null) {
    const resolvedChoiceId = choiceId ?? selectedChoiceId
    const choice = ORIGINS_STEP.choices.find((item) => item.id === resolvedChoiceId)

    if (choice) {
      setSelectedRaceId(choice.suggestedRaceId)
      setSelectedClassId(choice.suggestedClassId)
    }

    setPhase('creation')
  }

  function randomizeHero() {
    const randomRace = RACE_OPTIONS[Math.floor(Math.random() * RACE_OPTIONS.length)]
    const randomClass = CLASS_OPTIONS[Math.floor(Math.random() * CLASS_OPTIONS.length)]
    const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]

    setSelectedRaceId(randomRace.id)
    setSelectedClassId(randomClass.id)
    setHeroName(randomName)
  }

  function finishOrigins() {
    if (!heroName.trim()) {
      return
    }

    onComplete?.(buildHeroSummary(heroName.trim(), selectedRaceId, selectedClassId))
  }

  return (
    <CenteredStageShell width={phase === 'prologue' ? 'narrow' : 'wide'}>
      {phase === 'prologue' ? (
        <TutorialStep
          onContinue={() => moveToCreation(selectedChoiceId)}
          onSelectChoice={(choiceId) => setSelectedChoiceId(choiceId)}
          onSkip={() => moveToCreation(null)}
          selectedChoiceId={selectedChoiceId}
          step={ORIGINS_STEP}
        />
      ) : (
        <StepCreation
          canFinish={heroName.trim().length > 0}
          classes={CLASS_OPTIONS}
          heroName={heroName}
          onBack={() => setPhase('prologue')}
          onClassSelect={setSelectedClassId}
          onFinish={finishOrigins}
          onNameChange={setHeroName}
          onRaceSelect={setSelectedRaceId}
          onRandomize={randomizeHero}
          races={RACE_OPTIONS}
          selectedClassId={selectedClassId}
          selectedRaceId={selectedRaceId}
          stats={resolveHeroStats(selectedRaceId, selectedClassId)}
        />
      )}
    </CenteredStageShell>
  )
}
