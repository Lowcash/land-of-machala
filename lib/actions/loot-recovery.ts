'use server'

import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { logActivity } from './activity-log'

interface DeathLocation {
  x: number
  y: number
  items: string[]
  gold: number
  expiresAt: string
}

interface Notification {
  timestamp: string
  message: string
  items: string[]
}

export async function cleanExpiredLootPiles(characterId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: {
        id: true,
        deathLocation: true,
        lootExpirationNotifications: true,
      },
    })

    if (!character || !character.deathLocation) return

    const deathLoc = character.deathLocation as unknown as DeathLocation
    if (new Date() > new Date(deathLoc.expiresAt)) {
      // Expired
      // Add notification to history
      const notifications = Array.isArray(character.lootExpirationNotifications)
        ? (character.lootExpirationNotifications as unknown as Notification[])
        : []

      notifications.push({
        timestamp: new Date().toISOString(),
        message: `Tvé věci z úmrtí na [${deathLoc.x}, ${deathLoc.y}] nenávratně zmizely.`,
        items: deathLoc.items, // Keep record of what was lost
      })

      await prisma.character.update({
        where: { id: characterId },
        data: {
          deathLocation: Prisma.DbNull,
          lootExpirationNotifications: notifications as unknown as Prisma.InputJsonValue,
        },
      })

      await logActivity(characterId, 'loot', 'Tvé opuštěné věci expirovaly a zmizely.', {
        x: deathLoc.x,
        y: deathLoc.y,
      })

      revalidatePath('/game')
    }
  } catch (error) {
    console.error('Loot cleanup error:', error)
  }
}

export async function recoverLoot(characterId: string) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    })

    if (!character || !character.deathLocation) {
      return { success: false, message: 'Žádné věci k vyzvednutí.' }
    }

    const deathLoc = character.deathLocation as unknown as DeathLocation

    // Check distance
    if (character.locationX !== deathLoc.x || character.locationY !== deathLoc.y) {
      return { success: false, message: 'Musíš být na místě smrti.' }
    }

    // Give items back (logic depends on how items are stored in JSON vs Inventory tables)
    // Ideally we would move items back to inventory_items table (not implemented here for simplicity)

    await prisma.character.update({
      where: { id: characterId },
      data: {
        deathLocation: Prisma.DbNull,
        gold: character.gold + (deathLoc.gold || 0),
      },
    })

    await logActivity(
      characterId,
      'loot',
      `Vyzvedl jsi své ztracené věci a ${deathLoc.gold} zlaťáků!`
    )
    revalidatePath('/game')
    return { success: true, message: 'Věci vyzvednuty!' }
  } catch (error) {
    console.error('Loot recovery error:', error)
    return { success: false, message: 'Chyba při vyzvedávání.' }
  }
}
