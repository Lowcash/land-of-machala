'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { generateRandomName } from '@/lib/game/data/names'
import type { OriginsChoice } from '@/lib/game/data/origins'
import type {
  TranslatedClassInfo,
  TranslatedRaceInfo,
  TranslatedStoryStep,
} from '@/lib/game/data/shared'

interface UseCharacterCreationProps {
  races: TranslatedRaceInfo[]
  classes: TranslatedClassInfo[]
}

interface UseOriginsNarrativeProps {
  steps: TranslatedStoryStep[]
  onEnd: () => void
}

export function useCharacterCreation({ races, classes }: UseCharacterCreationProps) {
  const [name, setName] = React.useState('')
  const [selectedRaceId, setSelectedRaceId] = React.useState(races[0].id)
  const [selectedClassId, setSelectedClassId] = React.useState(classes[0].id)

  const selectedRace = React.useMemo(
    () => races.find((r) => r.id === selectedRaceId) || races[0],
    [selectedRaceId, races]
  )

  const selectedClass = React.useMemo(
    () => classes.find((c) => c.id === selectedClassId) || classes[0],
    [selectedClassId, classes]
  )

  const totalStats = React.useMemo(() => {
    const base = selectedRace.stats
    const mod = selectedClass.statMod
    return {
      hp: base.hp + (mod.hp || 0),
      mana: base.mana + (mod.mana || 0),
      strength: base.strength + (mod.strength || 0),
      intelligence: base.intelligence + (mod.intelligence || 0),
      agility: base.agility + (mod.agility || 0),
      stamina: base.stamina + (mod.stamina || 0),
    }
  }, [selectedRace, selectedClass])

  const handleRandomize = React.useCallback(() => {
    const randomRace = races[Math.floor(Math.random() * races.length)]
    const randomClass = classes[Math.floor(Math.random() * classes.length)]
    setSelectedRaceId(randomRace.id)
    setSelectedClassId(randomClass.id)
    setName(generateRandomName())
  }, [races, classes])

  return {
    characterName: name,
    setName,
    selectedRaceId,
    setSelectedRaceId,
    selectedClassId,
    setSelectedClassId,
    selectedRace,
    selectedClass,
    totalStats,
    handleRandomize,
  }
}

/**
 * Hook to manage the Origins narrative steps.
 */
function useOriginsNarrative({ steps, onEnd }: UseOriginsNarrativeProps) {
  const [stepIndex, setStepIndex] = React.useState(0)

  const currentStep = React.useMemo(() => steps[stepIndex], [stepIndex, steps])

  const handleChoice = React.useCallback(
    (choice: OriginsChoice) => {
      if (choice.nextStep === 'end') {
        return onEnd()
      }

      const nextIndex = steps.findIndex((s) => s.id === choice.nextStep)
      if (nextIndex === -1) {
        return onEnd()
      }

      setStepIndex(nextIndex)
    },
    [onEnd, steps]
  )

  return {
    currentStep,
    stepIndex,
    handleChoice,
  }
}

export function useOrigins({
  races,
  classes,
  steps,
}: UseCharacterCreationProps & { steps: TranslatedStoryStep[] }) {
  const router = useRouter()
  const [phase, setPhase] = React.useState<'tutorial' | 'creation'>('tutorial')

  const character = useCharacterCreation({ races, classes })
  const narrative = useOriginsNarrative({ steps, onEnd: () => setPhase('creation') })

  const handleFinish = React.useCallback(() => {
    router.push('/')
  }, [router])

  return {
    phase,
    ...narrative,
    ...character,
    handleSkip: () => setPhase('creation'),
    handleFinish,
    canFinish: character.characterName.trim().length > 0,
  }
}
