import TypedEventEmitter from '@/lib/emitter'
import type { Enemy } from '@prisma/client'

export const emitter = new TypedEventEmitter<{
  defeated: Enemy
}>()
