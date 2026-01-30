import { EnemyBehavior } from '@prisma/client'

export interface EnemyTemplate {
  name: string
  level: number
  maxHp: number
  attack: number
  defense: number
  magic: number
  behavior: EnemyBehavior
  experienceReward: number
  goldReward: number
  iconName: string
}

export const ENEMIES: EnemyTemplate[] = [
  {
    name: 'Hladový Vlk',
    level: 2,
    maxHp: 40,
    attack: 12,
    defense: 5,
    magic: 0,
    behavior: EnemyBehavior.AGGRESSIVE,
    experienceReward: 15,
    goldReward: 5,
    iconName: 'paw-print',
  },
  {
    name: 'Lesní Bandita',
    level: 4,
    maxHp: 70,
    attack: 15,
    defense: 8,
    magic: 0,
    behavior: EnemyBehavior.BALANCED,
    experienceReward: 35,
    goldReward: 25,
    iconName: 'sword',
  },
  {
    name: 'Medvěd',
    level: 6,
    maxHp: 120,
    attack: 25,
    defense: 12,
    magic: 0,
    behavior: EnemyBehavior.AGGRESSIVE,
    experienceReward: 60,
    goldReward: 15,
    iconName: 'paw-print',
  },
  {
    name: 'Stínový Stalker',
    level: 8,
    maxHp: 90,
    attack: 35,
    defense: 5,
    magic: 10,
    behavior: EnemyBehavior.AGGRESSIVE,
    experienceReward: 70,
    goldReward: 40,
    iconName: 'ghost',
  },
]
