'use client'

import { AnimatePresence } from 'framer-motion'

import { FadeIn } from '@/components/ui/core/animations/fade-in'

import { StepCreation } from './step-creation'
import { TutorialStep } from './step-tutorial'
import { useOrigins } from './use-origins'

/**
 * Orchestrates the Origins narrative flow.
 * Handles step transitions with animations.
 */
export function OriginsWizard() {
  const {
    phase,
    currentStep,
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
  } = useOrigins()

  return (
    <AnimatePresence mode="wait">
      {phase === 'tutorial' ? (
        <TutorialStep
          key={currentStep.id}
          step={currentStep}
          onChoice={handleChoice}
          onSkip={handleSkip}
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
          />
        </FadeIn>
      )}
    </AnimatePresence>
  )
}
