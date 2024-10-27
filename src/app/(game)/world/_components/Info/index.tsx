'use client'

import React from 'react'
import { useGame } from '@/context/game-provider'
import { useInfoQuery } from '@/hooks/api/useGame'

import * as S from './index.styles'
import Image from 'next/image'
import Place from './Place'

export default function Info() {
  const { setBackground } = useGame()
  
  const infoQuery = useInfoQuery()

  // @ts-ignore
  const hasEnemy = !!infoQuery.data.enemy
  // @ts-ignore
  const hasPlace = !!infoQuery.data.place
  // @ts-ignore
  const hasLoot = !!infoQuery.data.loot
  // @ts-ignore
  const isDefeated = !!infoQuery.data.defeated

  React.useEffect(() => {
    if (infoQuery.isLoading) return

    setBackground?.(hasPlace ? undefined : '/images/environment/forest.webp')
  }, [hasPlace, infoQuery.isLoading, setBackground])

  if (isDefeated)
    return (
      <>
        <S.Info>
          <S.Text>Byl jsi zničen a probudil ses v nemocnici. Přišel jsi o všechny své věci!!</S.Text>
        </S.Info>
        {hasPlace && (
          <S.Info>
            {/* @ts-ignore */}
            <Place {...infoQuery.data.place} forceSubplace='hospital' defeated />
          </S.Info>
        )}
      </>
    )

  if (hasLoot) {
    // @ts-ignore
    const armors = infoQuery.data.loot?.armors_loot.map((x: any) => x.armor.name)
    // @ts-ignore
    const weapons = infoQuery.data.loot?.weapons_loot.map((x: any) => x.weapon.name)

    return (
      <S.Info>
        V lootu se nachází: <br /> <br />
        {armors?.map((x: string, idx: number) => (
          <S.Text key={`LootArmor_${idx}`}>
            {x} <br />
          </S.Text>
        ))}
        {weapons?.map((x: string, idx: number) => (
          <S.Text key={`LootWeapon_${idx}`}>
            {x} <br />
          </S.Text>
        ))}
        {/* @ts-ignore */}
        <S.Text>{infoQuery.data.loot.money} zlaťáků</S.Text>
      </S.Info>
    )
  }

  if (hasEnemy) {
    // @ts-ignore
    const name = infoQuery.data.enemy.enemy?.name
    // @ts-ignore
    const hpActual = infoQuery.data.enemy.hp_actual
    // @ts-ignore
    const hpMax = infoQuery.data.enemy.hp_max

    return (
      <>
        <S.Info>
          <S.Text>
            Najednou se před tebou objevil{' '}
            <b>
              {name} ({hpActual}/{hpMax})
            </b>{' '}
            a vyzývá tě na souboj
          </S.Text>
        </S.Info>

        <Image
          priority
          src={`/images/enemies/${name}.png`}
          alt={name}
          width={500}
          height={500}
          className='ml-auto mr-auto mt-auto'
        />
      </>
    )
  }

  if (hasPlace)
    return (
      <S.Info>
        {/* @ts-ignore */}
        <Place {...infoQuery.data.place} />
      </S.Info>
    )

  return <S.Info>Jsi na průzkumu světa!</S.Info>
}
