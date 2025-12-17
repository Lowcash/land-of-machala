export type CombatAction = 'attack' | 'defend' | 'item' | 'flee'

export interface Enemy {
  id: string
  name: string
  level: number
  hp: number
  maxHp: number
  attack: number
  defense: number
  xpReward: number
  goldReward: number
  image?: string
}

export interface CombatState {
  isInCombat: boolean
  turn: 'player' | 'enemy'
  enemy: Enemy | null
  log: CombatLogEntry[]
}

export interface CombatLogEntry {
  text: string
  type: 'info' | 'player-attack' | 'enemy-attack' | 'heal' | 'damage'
}
