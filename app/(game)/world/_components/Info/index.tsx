'use client'

import React from 'react'
import type { Location } from '@/types'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'
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
  const gameShowInfoQuery = useGameShowInfoQuery()

  const { selectedSubplace, setSelectedSubplace } = useSetPlace(
    gameShowInfoQuery.data?.place?.id ?? 'road',
    gameShowInfoQuery.derived.hasDefeated ? 'hospital' : undefined,
  )

  if (gameShowInfoQuery.derived.hasCombat)
    return (
      <>
        <Card>
          <Text
            dangerouslySetInnerHTML={{
              __html: gameShowInfoQuery.data?.combat?.text?.enemyAppear ?? 'game_enemy_appear',
            }}
          />
        </Card>
        <Image
          priority
          src={`/images/enemies/${gameShowInfoQuery.data?.combat?.enemyInstance?.enemy.id}.png`}
          alt={gameShowInfoQuery.data?.combat?.enemyInstance?.enemy.id ?? 'enemy'}
          width={500}
          height={500}
          className='ml-auto mr-auto mt-auto'
        />
      </>
    )

  if (gameShowInfoQuery.derived.hasLoot) {
    const armors = gameShowInfoQuery.data?.loot?.armors_loot?.map((x) => x.text.reward)
    const weapons = gameShowInfoQuery.data?.loot?.weapons_loot?.map((x) => x.text.reward)

    return (
      <Card>
        <Text
          dangerouslySetInnerHTML={{
            __html: `${gameShowInfoQuery.data?.loot?.text?.loot_found ?? 'game_loot_found'}:`,
          }}
        />
        <div className='flex flex-col'>
          {armors?.map((x: string, idx: number) => <Text key={`LootArmor_${idx}`}>{x}</Text>)}
          {weapons?.map((x: string, idx: number) => <Text key={`LootWeapon_${idx}`}>{x}</Text>)}
        </div>
        <div className='flex flex-col'>
          <Text>{gameShowInfoQuery.data?.loot?.text?.reward_money ?? 'game_reward_money'}</Text>
          <Text>{gameShowInfoQuery.data?.loot?.text?.reward_xp ?? 'game_reward_xp'}</Text>
        </div>
      </Card>
    )
  }

  if (gameShowInfoQuery.derived.hasPlace) {
    if (!!selectedSubplace) {
      const hospital = gameShowInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'hospital')?.place
      const armory = gameShowInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'armory')?.place
      const bank = gameShowInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'bank')?.place

      return (
        <Card>
          {gameShowInfoQuery.derived.hasDefeated ? (
            <Text
              dangerouslySetInnerHTML={{
                __html: gameShowInfoQuery.data?.player?.text?.defeated ?? 'game_player_defeated',
              }}
            />
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
        <div className='flex flex-col'>
          <Text dangerouslySetInnerHTML={{ __html: gameShowInfoQuery.data?.place?.text?.header ?? 'place_header' }} />
          <Text
            dangerouslySetInnerHTML={{
              __html: gameShowInfoQuery.data?.place?.text?.description ?? 'place_description',
            }}
            small
            italic
          />
        </div>

        {gameShowInfoQuery.derived.hasSubplace && (
          <List>
            {gameShowInfoQuery.data?.place?.subplaces?.map((x) => (
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

  React.useEffect(() => forceSubplace && setSelectedSubplace(forceSubplace), [forceSubplace])

  return { selectedSubplace, setSelectedSubplace }
}
