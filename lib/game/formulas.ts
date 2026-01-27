export const BASE_CRIT_CHANCE = 5
export const BASE_DODGE_CHANCE = 5

export function calculateCritChance(agility: number): number {
  return Math.min(BASE_CRIT_CHANCE + Math.floor(agility / 2), 50)
}

export function calculateDodgeChance(agility: number): number {
  return Math.min(BASE_DODGE_CHANCE + Math.floor(agility / 3), 40)
}
