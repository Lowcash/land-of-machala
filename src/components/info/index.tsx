'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'
import { Label } from '@radix-ui/react-label'
import { Place } from './place'

export default function Info() {
  const { data: info } = api.game.info.useQuery()

  if (!!info?.enemyInstance?.enemy) {
    return (
      <S.Info>
        <Label>
          Najednou se před tebou objevil{' '}
          <b>
            {info.enemyInstance.enemy.name} ({info.enemyInstance.hp_actual}/{info.enemyInstance.hp_max})
          </b>{' '}
          a vyzývá tě na souboj
        </Label>
      </S.Info>
    )
  }

  if (!!info?.loot) {
    const armors = info?.loot?.armors_loot.map((x: any) => x.armor.name)
    const weapons = info?.loot?.weapons_loot.map((x: any) => x.weapon.name)

    return (
      <S.Info>
        V lootu se nachází: <br /> <br />
        {armors.map((x: string) => (
          <Label>
            {x} <br />
          </Label>
        ))}
        {weapons.map((x: string) => (
          <Label>
            {x} <br />
          </Label>
        ))}
        <Label>{info.loot.money} zlaťáků</Label>
      </S.Info>
    )
  }

  if (!!info?.place) return <Place {...info.place} />

  return <S.Info>Jsi na průzkumu světa!</S.Info>
}
