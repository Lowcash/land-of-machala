'use client'

import React from 'react'
import type { Location } from '@/types'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameInfoShowQuery } from '@/hooks/api/use-game'
import { useSetLocationBackgroundEffect } from '@/context/game-provider'

import Image from 'next/image'
import { Card, List } from '@/styles/common'
import { Text, Link } from '@/styles/typography'
import { Button } from '@/components/ui/button'

import Hospital from '@/app/(game)/world/_components/Info/Place/Hospital'
import Armory from '@/app/(game)/world/_components/Info/Place/Armory'
import Bank from '@/app/(game)/world/_components/Info/Place/Bank'

export default function Info() {
  const commonShowQuery = useCommonShowQuery()
  const gameInfoShowQuery = useGameInfoShowQuery()

  const { selectedSubplace, setSelectedSubplace } = useSetPlace(
    gameInfoShowQuery.data?.place?.id ?? 'road',
    gameInfoShowQuery.derived.hasDefeated ? 'hospital' : undefined,
  )

  if (gameInfoShowQuery.derived.hasCombat)
    return (
      <>
        <Card>
          <Text
            dangerouslySetInnerHTML={{
              __html: gameInfoShowQuery.data?.combat?.text?.enemyAppear ?? 'game_enemy_appear',
            }}
          />
        </Card>
        <Image
          priority
          src={`/images/enemies/${gameInfoShowQuery.data?.combat?.enemyInstance?.enemy.id}.png`}
          alt={gameInfoShowQuery.data?.combat?.enemyInstance?.enemy.id ?? 'enemy'}
          width={500}
          height={500}
          className='ml-auto mr-auto mt-auto'
        />
      </>
    )

  if (gameInfoShowQuery.derived.hasLoot) {
    const armors = gameInfoShowQuery.data?.loot?.armors_loot?.map((x) => x.armor.name)
    const weapons = gameInfoShowQuery.data?.loot?.weapons_loot?.map((x) => x.weapon.name)

    return (
      <Card>
        <Text>{gameInfoShowQuery.data?.loot?.text?.loot_found ?? 'game_loot_found'}:</Text>
        <div className='flex flex-col'>
          {armors?.map((x: string, idx: number) => <Text key={`LootArmor_${idx}`}>{x}</Text>)}
          {weapons?.map((x: string, idx: number) => <Text key={`LootWeapon_${idx}`}>{x}</Text>)}
        </div>
        <Text>{gameInfoShowQuery.data?.loot?.text?.reward ?? 'game_loot_reward'}</Text>
      </Card>
    )
  }

  if (gameInfoShowQuery.derived.hasPlace) {
    if (!!selectedSubplace) {
      const hospital = gameInfoShowQuery.data?.place?.subplaces?.find((x) => x.type === 'hospital')?.place
      const armory = gameInfoShowQuery.data?.place?.subplaces?.find((x) => x.type === 'armory')?.place
      const bank = gameInfoShowQuery.data?.place?.subplaces?.find((x) => x.type === 'bank')?.place

      return (
        <Card>
          {gameInfoShowQuery.derived.hasDefeated ? (
            <Text>{gameInfoShowQuery.data?.combat?.text?.playerDestroyed ?? 'game_player_destroyed'}</Text>
          ) : (
            <Button variant='warning' size={'shrink-sm'} onClick={() => setSelectedSubplace(undefined)}>
              {commonShowQuery.data?.text.cityBack ?? 'city_back'}
            </Button>
          )}

          {selectedSubplace === 'hospital' && !!hospital && <Hospital hospitalId={hospital.id} />}
          {selectedSubplace === 'armory' && !!armory && <Armory armoryId={armory.id} />}
          {selectedSubplace === 'bank' && !!bank && <Bank bankId={bank.id} />}
        </Card>
      )
    }

    return (
      <Card>
        <Text dangerouslySetInnerHTML={{ __html: gameInfoShowQuery.data?.place?.text?.header ?? 'place_header' }} />
        <Text
          dangerouslySetInnerHTML={{ __html: gameInfoShowQuery.data?.place?.text?.description ?? 'place_description' }}
        />

        {gameInfoShowQuery.derived.hasSubplace && (
          <List>
            {gameInfoShowQuery.data?.place?.subplaces?.map((x) => (
              <li key={`SubPlace_${x.type}`}>
                <Link onClick={() => setSelectedSubplace(x.type as Location)}>{x.place?.name ?? 'subplace_name'}</Link>
              </li>
            ))}
          </List>
        )}
      </Card>
    )
  }

  return (
    <Card>
      <Text>{commonShowQuery.data?.text?.worldExplore ?? 'game_world_eplore'}</Text>
    </Card>
  )
}

function useSetPlace(place?: Location, forceSubplace?: Location) {
  const [selectedSubplace, setSelectedSubplace] = React.useState<Location | undefined>(forceSubplace)

  useSetLocationBackgroundEffect(selectedSubplace ?? place)

  return { selectedSubplace, setSelectedSubplace }
}
