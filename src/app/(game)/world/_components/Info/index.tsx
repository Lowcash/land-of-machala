'use client'

import React from 'react'
import { loc } from '@/localization'
import { useGame } from '@/context/game-provider'
import { useShowInfoQuery } from '@/hooks/api/useGame'

import { Text } from '@/styles/text-server'
import { Card } from '@/styles/common-server'
import Image from 'next/image'
import Place from './Place'

export default function Info() {
  const infoQuery = useShowInfoQuery()

  const hasEnemy = !!infoQuery.data?.enemy
  const hasPlace = !!infoQuery.data?.place
  const hasLoot = !!infoQuery.data?.loot

  const isDefeated = !!infoQuery.data?.defeated

  useBackground(hasPlace ? 'place' : 'world')

  if (isDefeated)
    return (
      <>
        <Card>
          <Text>{loc.enemy.player_destroyed}</Text>
        </Card>
        {hasPlace && (
          <Card>
            <Place forceSubplace='hospital' />
          </Card>
        )}
      </>
    )

  if (hasLoot) {
    const armors = infoQuery.data?.loot?.armors_loot.map((x: any) => x.armor.name)
    const weapons = infoQuery.data?.loot?.weapons_loot.map((x: any) => x.weapon.name)

    return (
      <Card>
        {loc.loot.found}:
        {armors?.map((x: string, idx: number) => (
          <Text key={`LootArmor_${idx}`}>
            {x} <br />
          </Text>
        ))}
        {weapons?.map((x: string, idx: number) => (
          <Text key={`LootWeapon_${idx}`}>
            {x} <br />
          </Text>
        ))}
        <Text>
          {infoQuery.data?.loot?.money} {loc.common.currency}
        </Text>
      </Card>
    )
  }

  if (hasEnemy) {
    const name = infoQuery.data?.enemy?.enemy?.name
    const hpActual = infoQuery.data?.enemy?.hp_actual
    const hpMax = infoQuery.data?.enemy?.hp_max

    return (
      <>
        <Card>
          <Text>
            {loc.enemy.appear}&nbsp;
            <b>
              {name} ({hpActual}/{hpMax})
            </b>
            &nbsp;
            {loc.enemy.challenges}
          </Text>
        </Card>

        <Image
          priority
          src={`/images/enemies/${name}.png`}
          alt={name ?? loc.enemy.header}
          width={500}
          height={500}
          className='ml-auto mr-auto mt-auto'
        />
      </>
    )
  }

  if (hasPlace)
    return (
      <Card>
        <Place />
      </Card>
    )

  return <Card>{loc.world.explore}</Card>
}

function useBackground(location: 'place' | 'world') {
  const { setBackground } = useGame()

  React.useEffect(() => {
    setBackground(location === 'world' ? '/images/environment/forest.webp' : undefined)
  }, [location])
}
