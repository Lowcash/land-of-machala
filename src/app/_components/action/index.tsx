'use server'

import { api } from '@/trpc/server'

import Action from './Action'

export default async function () {
  const data = await api.game.info()

  return <Action data={data} />
}
