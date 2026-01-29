import { prisma } from '@/lib/db'

export async function getAllEnemies() {
  return await prisma.enemy.findMany({
    orderBy: [{ level: 'asc' }],
  })
}

export async function getEnemy(id: string) {
  return await prisma.enemy.findUnique({
    where: { id },
  })
}

export async function getEnemiesByLevel(minLevel: number, maxLevel: number) {
  return await prisma.enemy.findMany({
    where: {
      level: {
        gte: minLevel,
        lte: maxLevel,
      },
    },
    orderBy: [{ level: 'asc' }],
  })
}

export async function getRandomEnemy(characterLevel: number) {
  const levelRange = 2
  const minLevel = Math.max(1, characterLevel - levelRange)
  const maxLevel = characterLevel + levelRange

  const enemies = await prisma.enemy.findMany({
    where: {
      level: {
        gte: minLevel,
        lte: maxLevel,
      },
    },
  })

  if (enemies.length === 0) {
    throw new Error('No enemies found for level range')
  }

  return enemies[Math.floor(Math.random() * enemies.length)]
}

// -- State Management --

export async function updateCharacterCombatState(
  characterId: string,
  data: {
    inCombat?: boolean
    combatEnemyId?: string | null
    combatTurn?: 'player' | 'enemy' | null
    combatPlayerHp?: number | null
    combatEnemyHp?: number | null
    currentView?: string
  }
) {
  return await prisma.character.update({
    where: { id: characterId },
    data,
  })
}

export async function getCharacterCombatState(characterId: string) {
  return await prisma.character.findUnique({
    where: { id: characterId },
    select: {
      inCombat: true,
      combatEnemyId: true,
      combatTurn: true,
      combatPlayerHp: true,
      combatEnemyHp: true,
      currentView: true,
    },
  })
}
