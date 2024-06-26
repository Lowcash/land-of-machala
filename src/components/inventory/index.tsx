'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'

export default function Inventory() {
  const { data: inventory } = api.player.inventory.useQuery()

  const armors = inventory?.armors?.map((x: any) => x.armor.name)
  const weapons = inventory?.weapons?.map((x: any) => x.weapon.name)

  const lootText = `V batohu se nachází: <br/><br/> <b>${armors?.map((x: string, idx: number) => `${idx > 0 ? '<br />' : ''}${x}`)}<br/>${weapons?.map((x: string, idx: number) => `${idx > 0 ? '<br />' : ''}${x}`)}</b>`

  return <S.Info dangerouslySetInnerHTML={{ __html: lootText }} />
}
