import type { Class, Race } from '@/lib/game/onboarding'
import { useOnboarding } from '@/lib/hooks/game/useOnboarding'

import { OnboardingCreation } from './OnboardingCreation'
import { OnboardingIntro } from './OnboardingIntro'

interface OnboardingProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

/**
 * Onboarding Feature Component
 * Manages the multi-step character creation process
 */
export function Onboarding({ searchParams }: OnboardingProps) {
  const { step, storyIndex, safeRace, safeClass, finalStats } = useOnboarding({ searchParams })

  if (step === 0) {
    return <OnboardingIntro storyIndex={storyIndex} />
  }

  return (
    <OnboardingCreation
      race={safeRace as Race}
      characterClass={safeClass as Class}
      finalStats={finalStats}
      searchParams={searchParams}
    />
  )
}
