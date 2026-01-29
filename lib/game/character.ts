import type { CharacterRace } from '@prisma/client'

import { RACE_STATS } from '@/lib/game/constants/character'
import { calculateMaxHp, calculateMaxMana } from '@/lib/game/formulas'

export function calculateInitialStats(race: CharacterRace) {
  const stats = RACE_STATS[race]
  const level = 1
  const maxHp = calculateMaxHp(stats.stamina, level)
  const maxMana = calculateMaxMana(stats.intelligence, level)

  return {
    ...stats,
    level,
    experience: 0,
    hp: maxHp,
    maxHp,
    mana: maxMana,
    maxMana,
    gold: 0,
    talentPoints: 0,
  }
}
