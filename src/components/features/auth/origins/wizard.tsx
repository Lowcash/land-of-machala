'use client'

import { AnimatePresence } from 'framer-motion'

import { TutorialStep } from './step-tutorial'
import { useOrigins } from './use-origins'

/**
 * Orchestrates the Origins narrative flow.
 * Handles step transitions with animations.
 */
export function OriginsWizard() {
  const { currentStep, handleChoice, handleSkip } = useOrigins()

  return (
    <AnimatePresence mode="wait">
      <TutorialStep
        key={currentStep.id}
        step={currentStep}
        onChoice={handleChoice}
        onSkip={handleSkip}
      />
    </AnimatePresence>
  )
}
