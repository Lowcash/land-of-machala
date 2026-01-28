'use client'

import { classes, races } from '@/lib/game/onboarding'
import { parseOnboardingParams } from '@/lib/schemas/onboardingParams'

interface UseOnboardingProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export function useOnboarding({ searchParams }: UseOnboardingProps) {
  // Parse URL params safely
  const {
    step,
    story: storyIndex,
    race,
    class: characterClass,
  } = parseOnboardingParams(searchParams ?? {})

  // Validate race/class (fallback to default if invalid)
  const safeRace = races.find((r) => r.id === race) ? race : 'human'
  const safeClass = classes.find((c) => c.id === characterClass) ? characterClass : 'warrior'

  const selectedClass = classes.find((c) => c.id === safeClass)!
  const selectedRace = races.find((r) => r.id === safeRace)!

  // Calculate final stats
  const finalStats = {
    hp: selectedRace.stats.hp,
    hpMax: selectedRace.stats.hp,
    mana: selectedRace.stats.mana,
    manaMax: selectedRace.stats.mana,
    strength: selectedRace.stats.strength + selectedClass.statMod.strength,
    intelligence: selectedRace.stats.intelligence + selectedClass.statMod.intelligence,
    agility: selectedRace.stats.agility + selectedClass.statMod.agility,
    stamina: selectedRace.stats.stamina + selectedClass.statMod.stamina,
  }

  return {
    step,
    storyIndex,
    safeRace,
    safeClass,
    finalStats,
    selectedClass,
    selectedRace,
  }
}
