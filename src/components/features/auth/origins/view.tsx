'use client'

import { AnimatePresence } from 'framer-motion'

import type {
  TranslatedClassInfo,
  TranslatedRaceInfo,
  TranslatedStoryStep,
} from '@/lib/game/data/shared'

import { FadeIn } from '@/components/ui/core/animations/fade-in'
import { Background } from '@/components/ui/shared/background'

import { StepCreation } from './step-creation'
import { TutorialStep } from './step-tutorial'
import { useOrigins } from './use-origins'

interface OriginsViewProps {
  races: TranslatedRaceInfo[]
  classes: TranslatedClassInfo[]
  steps: TranslatedStoryStep[]
  statLabels: Record<string, string>
  uiLabels: any
  backgroundSrc: string
}

export function OriginsViewUI({
  races,
  classes,
  steps,
  statLabels,
  uiLabels,
  backgroundSrc,
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
  } = useOrigins({ races, classes, steps })

  return (
    <>
      <Background src={backgroundSrc} />
      <AnimatePresence mode="wait">
        {phase === 'tutorial' ? (
          <TutorialStep
            key={stepIndex}
            step={currentStep as TranslatedStoryStep}
            onChoice={handleChoice}
            onSkip={handleSkip}
            uiLabels={uiLabels.tutorial}
          />
        ) : (
          <FadeIn key="creation">
            <StepCreation
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
              races={races}
              classes={classes}
              statLabels={statLabels}
              uiLabels={uiLabels.creation}
            />
          </FadeIn>
        )}
      </AnimatePresence>
    </>
  )
}

export function OriginsView(props: OriginsViewProps) {
  return <OriginsViewUI {...props} />
}
