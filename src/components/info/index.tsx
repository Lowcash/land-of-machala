'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { useLayoutContext } from '@/ctx/layout-provider'

import * as S from './index.styles'
import Image from 'next/image'
import { Text } from '@/styles/text'
import { Place } from './place'

export default function Info() {
  const { setBackgroundUrl } = useLayoutContext()

  const { data: info, isLoading } = api.game.info.useQuery()

  const hasPlace = !!info?.place

  React.useEffect(() => {
    if (isLoading) return

    setBackgroundUrl?.(hasPlace ? undefined : '/images/environment/forest.webp')
  }, [hasPlace, isLoading, setBackgroundUrl])

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
    const name = info.enemyInstance.enemy.name

    return (
      <>
        <S.Info>
          <Text>
            Najednou se před tebou objevil{' '}
            <b>
              {name} ({info.enemyInstance.hp_actual}/{info.enemyInstance.hp_max})
            </b>{' '}
            a vyzývá tě na souboj
          </Text>
        </S.Info>

        <Image
          priority
          src={`/images/enemies/${name}.png`}
          alt={name}
          width={500}
          height={500}
          className='mt-auto ml-auto mr-auto'
        />
      </>
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
