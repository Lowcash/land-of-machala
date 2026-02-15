'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'

import { CLASSES } from '@/lib/game/data/classes'
import { generateRandomName } from '@/lib/game/data/names'
import { STORY_STEPS } from '@/lib/game/data/origins'
import type { OriginsChoice } from '@/lib/game/data/origins'
import { RACES } from '@/lib/game/data/races'

/**
 * Hook to manage character creation state.
 */
function useCharacterCreation() {
  const [name, setName] = React.useState('')
  const [selectedRaceId, setSelectedRaceId] = React.useState(RACES[0].id)
  const [selectedClassId, setSelectedClassId] = React.useState(CLASSES[0].id)

  const selectedRace = React.useMemo(
    () => RACES.find((r) => r.id === selectedRaceId) || RACES[0],
    [selectedRaceId]
  )

  const selectedClass = React.useMemo(
    () => CLASSES.find((c) => c.id === selectedClassId) || CLASSES[0],
    [selectedClassId]
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
    const randomRace = RACES[Math.floor(Math.random() * RACES.length)]
    const randomClass = CLASSES[Math.floor(Math.random() * CLASSES.length)]
    setSelectedRaceId(randomRace.id)
    setSelectedClassId(randomClass.id)
    setName(generateRandomName())
  }, [])

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
function useOriginsNarrative(onEnd: () => void) {
  const [stepIndex, setStepIndex] = React.useState(0)

  const currentStep = React.useMemo(() => STORY_STEPS[stepIndex], [stepIndex])

  const handleChoice = React.useCallback(
    (choice: OriginsChoice) => {
      if (choice.nextStep === 'end') {
        return onEnd()
      }

      const nextIndex = STORY_STEPS.findIndex((s) => s.id === choice.nextStep)
      if (nextIndex === -1) {
        return onEnd()
      }

      setStepIndex(nextIndex)
    },
    [onEnd]
  )

  return {
    currentStep,
    handleChoice,
  }
}

/**
 * Main Origins orchestrator hook.
 */
export function useOrigins() {
  const router = useRouter()
  const [phase, setPhase] = React.useState<'tutorial' | 'creation'>('tutorial')

  const character = useCharacterCreation()
  const narrative = useOriginsNarrative(() => setPhase('creation'))

  const handleFinish = React.useCallback(() => {
    router.push('/')
  }, [router])

  return {
    phase,
    ...narrative,
    ...character,
    handleSkip: () => setPhase('creation'),
    handleFinish,
  }
}
