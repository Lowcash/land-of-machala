'use server'

import { api } from '@/trpc/server'

export async function hasCharacter() {
  const player = await api.player.info()

  return !!player.race && !!player.profession
}