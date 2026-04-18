'use client'

import type { CompleteRootOnboardingInput } from '@/lib/auth/root-session'
import type {
  TranslatedClassInfo,
  TranslatedRaceInfo,
  TranslatedStoryStep,
} from '@/lib/game/data/shared'

import { Presence } from '@/components/ui/prefabs/animations/presence'
import { Background } from '@/components/ui/shared/background'

import { StepCreation } from './step-creation'
import { TutorialStep } from './step-tutorial'
import type { OriginsUiLabels } from './types'
import { useOrigins } from './use-origins'

interface OriginsViewProps {
  races: TranslatedRaceInfo[]
  classes: TranslatedClassInfo[]
  steps: TranslatedStoryStep[]
  statLabels: Record<string, string>
  uiLabels: OriginsUiLabels
  backgroundSrc: string
  onFinish?: (payload: CompleteRootOnboardingInput) => void | Promise<void>
  isLoading?: boolean
}

export function OriginsViewUI({
  races,
  classes,
  steps,
  statLabels,
  uiLabels,
  backgroundSrc,
  onFinish,
  isLoading,
}: OriginsViewProps) {
  const {
    phase,
    currentStep,
    stepIndex,
    characterName,
    selectedRaceId,
    selectedClassId,
    totalStats,
    setName,
    setSelectedRaceId,
    setSelectedClassId,
    handleChoice,
    handleSkip,
    handleRandomize,
    handleFinish,
    canFinish,
  } = useOrigins({ races, classes, steps, onFinish })

  return (
    <>
      <Background src={backgroundSrc} />
      <Presence mode="wait">
        {phase === 'tutorial' ? (
          <TutorialStep
            key={stepIndex}
            step={currentStep as TranslatedStoryStep}
            onChoice={handleChoice}
            onSkip={handleSkip}
            uiLabels={uiLabels.tutorial}
          />
        ) : (
          <StepCreation
            key="creation"
            name={characterName}
            onNameChange={setName}
            onRandomize={handleRandomize}
            onFinish={handleFinish}
            selectedRaceId={selectedRaceId}
            onRaceSelect={setSelectedRaceId}
            selectedClassId={selectedClassId}
            onClassSelect={setSelectedClassId}
            stats={totalStats}
            canFinish={canFinish}
            isLoading={isLoading}
            races={races}
            classes={classes}
            statLabels={statLabels}
            uiLabels={uiLabels.creation}
          />
        )}
      </Presence>
    </>
  )
}

export function OriginsView(props: OriginsViewProps) {
  return <OriginsViewUI {...props} />
}
