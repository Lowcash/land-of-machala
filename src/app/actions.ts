'use server'

import { api } from '@/trpc/server'
import { cache } from 'react'

export const getPlayerInfo = cache(api.player.info)

export async function hasCharacter() {
  const player = await getPlayerInfo()

  return !!player.race && !!player.profession
}

export async function move(p: Parameters<typeof api.player.move>[0]) {
  await api.player.move(p)
}