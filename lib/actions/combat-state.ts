'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { logActivity } from './activity-log'

export async function startCombat(characterId: string, enemyId: string | null = null) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })
    
    if (!character) throw new Error('Character not found')

    // Find enemy
    // If enemyId is not provided, pick random based on level/location?
    // This logic usually resides in `combat.ts`, but we are unifying state here.
    
    let targetEnemyId = enemyId
    if (!targetEnemyId) {
        // Simple random logic or fetch from DB
        const enemies = await prisma.enemy.findMany({
             where: { level: { lte: character.level + 2, gte: Math.max(1, character.level - 2) } }
        })
        if (enemies.length > 0) {
            targetEnemyId = enemies[Math.floor(Math.random() * enemies.length)]!.id
        }
    }
    
    if (!targetEnemyId) throw new Error('No enemy found')

    // Save pre-combat location
    const preCombatLoc = { x: character.locationX, y: character.locationY }
    
    await prisma.character.update({
        where: { id: characterId },
        data: {
            inCombat: true,
            combatEnemyId: targetEnemyId,
            currentEnemyId: targetEnemyId, // instance ID same as model for now, or UUID
            preCombatLocation: preCombatLoc,
            combatTurn: 'player',
            combatPlayerHp: character.hp,
            // Fetch enemy max HP to set initial combatEnemyHp
            // We need to fetch enemy first
        }
    })
    
    // We need to update enemy HP.
    const enemy = await prisma.enemy.findUnique({ where: { id: targetEnemyId } })
    if (enemy) {
         await prisma.character.update({
            where: { id: characterId },
            data: { combatEnemyHp: enemy.maxHp }
         })
         
         await logActivity(characterId, 'combat', `Boj začal! Nepřítel: ${enemy.name}`)
    }

    revalidatePath('/game')
    return { success: true }

  } catch (error) {
    console.error('Start combat error:', error)
    return { success: false }
  }
}

export async function endCombat(characterId: string, result: 'victory' | 'defeat' | 'flee') {
    try {
        const character = await prisma.character.findUnique({ where: { id: characterId } })
        if (!character) return

        if (result === 'victory') {
             // Logic for loot handled in combat actions or here?
             // Usually loot is distributed.
             await prisma.character.update({
                 where: { id: characterId },
                 data: {
                     inCombat: false,
                     combatEnemyId: null,
                     currentEnemyId: null,
                     combatPlayerHp: null,
                     combatEnemyHp: null,
                 }
             })
             await logActivity(characterId, 'combat', 'Zvítězil jsi v souboji!')
        } else if (result === 'flee') {
             // Restore position
             if (character.preCombatLocation) {
                 const loc = character.preCombatLocation as any
                 await prisma.character.update({
                     where: { id: characterId },
                     data: {
                         inCombat: false,
                         locationX: loc.x,
                         locationY: loc.y,
                         combatEnemyId: null,
                     }
                 })
             }
             await logActivity(characterId, 'combat', 'Utekl jsi z boje.')
        } else if (result === 'defeat') {
            // Death penalty
            const deathLoc = {
                x: character.locationX,
                y: character.locationY,
                items: [], // serialized items
                gold: Math.floor(character.gold * 0.5), // Drop 50% gold example
                enemyId: character.combatEnemyId,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
            
            // TODO: Move items to death box (remove from inventory)
            
            // Respawn at safe zone
            const safeZone = await prisma.location.findFirst({
                where: { serverId: character.serverId, isSafeZone: true }
            })
            
            await prisma.character.update({
                where: { id: characterId },
                data: {
                    inCombat: false,
                    hp: 1,
                    gold: character.gold - (deathLoc.gold), // deduct dropped gold
                    deathLocation: deathLoc,
                    locationX: safeZone?.positionX ?? 0,
                    locationY: safeZone?.positionY ?? 0,
                    combatEnemyId: null,
                }
            })
            
            await logActivity(characterId, 'death', 'Zemřel jsi! Tvé věci zůstaly na místě smrti.', { deathLocation: deathLoc })
        }
        
        revalidatePath('/game')
        return { success: true }
    } catch (error) {
        console.error('End combat error:', error)
        return { success: false }
    }
}
