import { getXPNeededForNextLevel } from '@/lib/game/progression'
import type { CharacterData, CharacterItem } from '@/lib/types/game'

// Types needed for combat calculations
interface Stats {
  strength: number
  intelligence: number
  agility: number
  stamina: number
}

interface EquipmentItem {
  strength?: number
  intelligence?: number
  agility?: number
  stamina?: number
  attack?: number
  damage?: number // fallback
  defense?: number
  item?: {
    strength?: number
    intelligence?: number
    agility?: number
    stamina?: number
    attack?: number // Item definition might have specific attack
    defense?: number
  }
}

/**
 * Calculate derived stats based on base stats and equipment
 */
export function calculateDerivedStats(character: CharacterData, inventory: CharacterItem[]) {
  const equipped = inventory.filter((item) => item.equipped)

  const stats = character.stats || {
    strength: character.strength,
    intelligence: character.intelligence,
    agility: character.agility,
    stamina: character.stamina,
  }

  const baseAttackVal = stats.strength * 2
  const equipAttack = equipped.reduce((sum, item) => sum + (item.attack || item.damage || 0), 0)
  const totalAttack = baseAttackVal + equipAttack

  const baseDefense = calculateDefense(stats, equipped as unknown as EquipmentItem[])
  const equipDefense = equipped.reduce((sum, item) => sum + (item.defense || 0), 0)

  return {
    totalAttack,
    totalDefense: baseDefense,
    baseAttack: baseAttackVal,
    baseDefense: Math.floor(stats.stamina * 1.5),
    equipmentAttack: equipAttack,
    equipmentDefense: equipDefense,
  }
}

/**
 * Safe percentage calculation clamped between 0 and 100
 */
export function calculatePercentage(current: number, max: number): number {
  if (max === 0) return 0
  return Math.max(0, Math.min(100, (current / max) * 100))
}

export function calculateCritChance(agility: number): number {
  return Math.min(50, Number((agility * 0.2).toFixed(1)))
}

export function calculateDodgeChance(agility: number): number {
  return Math.min(50, Number((agility * 0.15).toFixed(1)))
}

export function calculateMaxHp(stamina: number, level: number): number {
  return 100 + stamina * 10 + (level - 1) * 10
}

export function calculateMaxMana(intelligence: number, level: number): number {
  return 50 + intelligence * 10 + (level - 1) * 5
}

export function calculateProgression(currentLevel: number, currentXp: number, amount: number) {
  let xp = currentXp + amount
  let level = currentLevel
  let levelsGained = 0

  while (true) {
    const xpNeeded = getXPNeededForNextLevel(level)
    if (xp < xpNeeded) break
    xp -= xpNeeded
    level++
    levelsGained++
  }

  return { newLevel: level, newXp: xp, levelsGained }
}

export function calculateAttackDamage(
  base: number,
  stats: Stats,
  equipment: EquipmentItem[]
): number {
  const strBonus = stats.strength * 2

  const equipBonus = equipment.reduce((sum, item) => {
    const flatAttack = item.attack || item.damage || 0
    const embeddedAttack = item.item?.attack || 0
    return sum + Math.max(flatAttack, embeddedAttack)
  }, 0)

  return base + strBonus + equipBonus
}

export function calculateDefense(
  stats: Pick<Stats, 'stamina' | 'agility'>,
  equipment: EquipmentItem[]
): number {
  const baseDefense = Math.floor(stats.stamina * 1.5 + (stats.agility || 0) * 0.5)

  const equipDefense = equipment.reduce((sum, item) => {
    const flatDef = item.defense || 0
    const embeddedDef = item.item?.defense || 0
    return sum + Math.max(flatDef, embeddedDef)
  }, 0)

  return baseDefense + equipDefense
}

export function calculateCombatDamage(attack: number, defense: number): number {
  const damage = attack * (100 / (100 + defense))
  return Math.max(1, Math.floor(damage))
}

// 0-100 inputs
export function isCriticalHit(chance: number): boolean {
  return Math.random() * 100 < chance
}

export function calculateExperienceReward(
  base: number,
  mobLevel: number,
  charLevel: number
): number {
  const diff = mobLevel - charLevel
  let multiplier = 1.0
  if (diff > 0) multiplier += diff * 0.1
  if (diff < 0) multiplier = Math.max(0.1, 1.0 + diff * 0.1)

  return Math.floor(base * multiplier)
}

export function calculateGoldReward(base: number): number {
  // Random variance +/- 20%
  const variance = Math.random() * 0.4 - 0.2
  return Math.floor(base * (1 + variance))
}
