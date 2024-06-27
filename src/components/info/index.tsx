'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'

export default function Info() {
  const { data: info } = api.game.info.useQuery()

  if (info?.enemyInstance?.enemy) {
    const enemyText = `${info.enemyInstance.enemy.name} (${info.enemyInstance.hp_actual}/${info.enemyInstance.hp_max})`
    return <S.Info dangerouslySetInnerHTML={{ __html: enemyText }} />
  }

  if (info?.place) return <S.Info dangerouslySetInnerHTML={{ __html: info?.place?.name }} />

  if (info?.loot) {
    const armors = info?.loot.armors.map((x: any) => x.armor.name)
    const weapons = info?.loot.weapons.map((x: any) => x.weapon.name)
    const money = info?.loot.money

    const lootText = `V lootu se nachází: <br/><br/> <b>${armors.map((x: string, idx: number) => `${idx > 0 ? '<br />' : ''}${x}`)}<br/>${weapons.map((x: string, idx: number) => `${idx > 0 ? '<br />' : ''}${x}`)}<br />${money} zlaťáků</b>`

    return <S.Info dangerouslySetInnerHTML={{ __html: lootText }} />
  }

  return <></>
}
