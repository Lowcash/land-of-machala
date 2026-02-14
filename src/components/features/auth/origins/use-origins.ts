'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { STORY_STEPS } from '@/lib/game/data/origins'
import type { OriginsChoice } from '@/lib/game/data/origins'

/**
 * Hook to manage the Origins narrative steps.
 */
export function useOrigins() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = React.useState(0)

  const currentStep = React.useMemo(() => STORY_STEPS[stepIndex], [stepIndex])

  const finish = React.useCallback(() => {
    router.push('/')
  }, [router])

  const handleChoice = React.useCallback(
    (choice: OriginsChoice) => {
      // If it's the end of narrative, redirect back
      if (choice.nextStep === 'end') {
        return finish()
      }

      // Find the next step by ID
      const nextIndex = STORY_STEPS.findIndex((s) => s.id === choice.nextStep)
      if (nextIndex === -1) {
        return finish()
      }

      setStepIndex(nextIndex)
    },
    [finish]
  )

  const handleSkip = React.useCallback(() => {
    finish()
  }, [finish])

  return {
    currentStep,
    handleChoice,
    handleSkip,
  }
}
