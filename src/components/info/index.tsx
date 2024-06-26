'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'

export default function Info() {
  const { data: gameInfo } = api.game.info.useQuery()

  if (gameInfo?.enemyInstance?.enemy) {
    const enemyText = `${gameInfo.enemyInstance.enemy.name} (${gameInfo.enemyInstance.hp_actual}/${gameInfo.enemyInstance.hp_max})`
    return <S.Info dangerouslySetInnerHTML={{ __html: enemyText }} />
  }

  if (gameInfo?.place) return <S.Info dangerouslySetInnerHTML={{ __html: gameInfo?.place?.name }} />

  if (gameInfo?.loot) {
    const armors = gameInfo?.loot?.armors.map((x: any) => x.armor.name)
    const weapons = gameInfo?.loot?.weapons.map((x: any) => x.weapon.name)

    const lootText = `V lootu se nachází: <br/><br/> <b>${armors.map((x: string, idx: number) => `${idx > 0 ? '<br />' : ''}${x}`)}<br/>${weapons.map((x: string, idx: number) => `${idx > 0 ? '<br />' : ''}${x}`)}</b>`

    return <S.Info dangerouslySetInnerHTML={{ __html: lootText }} />
  }

  return <></>
}
