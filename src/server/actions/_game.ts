import TypedEventEmitter from '@/lib/emitter'
import type { Enemy } from '@prisma/client'

type EmitterEnemy = Enemy

export const enemyEmitter = new TypedEventEmitter<{
  defeated: EmitterEnemy
}>()
