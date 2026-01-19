'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function logActivity(
  characterId: string,
  type: string,
  message: string,
  metadata?: any,
  global: boolean = false
) {
  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: { serverId: true },
    })

    if (!character) return

    await prisma.activityLog.create({
      data: {
        characterId,
        serverId: character.serverId,
        type,
        message,
        metadata: metadata || {},
        global,
      },
    })
    
    revalidatePath('/game')
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}

export async function getCharacterActivityLog(characterId: string, limit: number = 50) {
  try {
    return await prisma.activityLog.findMany({
      where: {
        OR: [
          { characterId },
          { global: true, serverId: (await prisma.character.findUnique({ where: { id: characterId }, select: { serverId: true } }))?.serverId }
        ]
      },
      orderBy: { timestamp: 'desc' },
      take: limit,
      select: {
        id: true,
        timestamp: true,
        message: true,
        type: true,
        metadata: true
      }
    })
  } catch (error) {
    console.error('Failed to get activity log:', error)
    return []
  }
}
