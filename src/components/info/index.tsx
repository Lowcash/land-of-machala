'use client'

import { api } from '@/trpc/react'

import * as S from './index.styles'
import { Text } from '@/styles/text'
import { Place } from './place'

export default function Info() {
  const { data: info } = api.game.info.useQuery()

  if (!!info?.defeated)
    return (
      <>
        <S.Info>
          <Text>Byl jsi zničen a probudil ses v nemocnici. Přišel jsi o všechny své věci!!</Text>
        </S.Info>
        {!!info.place && (
          <S.Info>
            <Place {...info.place} forceSubplace='hospital' defeated />
          </S.Info>
        )}
      </>
    )

  if (!!info?.enemyInstance?.enemy) {
    return (
      <S.Info>
        <Text>
          Najednou se před tebou objevil{' '}
          <b>
            {info.enemyInstance.enemy.name} ({info.enemyInstance.hp_actual}/{info.enemyInstance.hp_max})
          </b>{' '}
          a vyzývá tě na souboj
        </Text>
      </S.Info>
    )
  }

  if (!!info?.loot) {
    const armors = info?.loot?.armors_loot.map((x: any) => x.armor.name)
    const weapons = info?.loot?.weapons_loot.map((x: any) => x.weapon.name)

    return (
      <S.Info>
        V lootu se nachází: <br /> <br />
        {armors.map((x: string, idx: number) => (
          <Text key={`LootArmor_${idx}`}>
            {x} <br />
          </Text>
        ))}
        {weapons.map((x: string, idx: number) => (
          <Text key={`LootWeapon_${idx}`}>
            {x} <br />
          </Text>
        ))}
        <Text>{info.loot.money} zlaťáků</Text>
      </S.Info>
    )
  }

  if (!!info?.place)
    return (
      <S.Info>
        <Place {...info.place} />
      </S.Info>
    )

  return <S.Info>Jsi na průzkumu světa!</S.Info>
}
