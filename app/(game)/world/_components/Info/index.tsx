'use client'

import React from 'react'
import type { Location } from '@/types'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'
import { usePlayerMoveMutation } from '@/hooks/api/use-player'
import { useSetLocationBackgroundEffect } from '@/context/game-provider'

import Image from 'next/image'
import { Card, List } from '@/styles/common'
import { Text, Link } from '@/styles/typography'
import { Button } from '@/components/ui/button'

import Hospital from '@/app/(game)/world/_components/Info/Place/Hospital'
import Armory from '@/app/(game)/world/_components/Info/Place/Armory'
import Bank from '@/app/(game)/world/_components/Info/Place/Bank'
import Enemy from '@/app/(game)/world/_components/Action/Enemy'

export default function Info() {
  const commonShowQuery = useCommonShowQuery()
  const gameShowInfoQuery = useGameShowInfoQuery()

  const playerMoveMutation = usePlayerMoveMutation()

  const { selectedPlace, setSelectedPlace } = useSetPlace(
    gameShowInfoQuery.derived.hasDefeated ? 'hospital' : (gameShowInfoQuery.data?.place?.id ?? 'road'),
  )

  const handleLeavePlace = () => playerMoveMutation.mutate({ direction: 'up' })

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
        <div className='relative flex w-full flex-1'>
          <Card className='z-40 w-fit justify-end'>
            <Enemy />
          </Card>
          <Image
            priority
            src={`/images/enemies/${gameShowInfoQuery.data?.combat?.enemyInstance?.enemy.id.toLowerCase()}.png`}
            alt={gameShowInfoQuery.data?.combat?.enemyInstance?.enemy.id ?? 'enemy'}
            width={500}
            height={500}
            className='absolute bottom-[-0%] left-[65%] h-[100%] min-h-[55vh] w-max max-w-none -translate-x-1/2'
          />
        </div>
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
    if (selectedPlace === 'hospital' || selectedPlace === 'armory' || selectedPlace === 'bank') {
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
            // TODO "main_city" is tempoprary solution
            <Button variant='warning' size={'shrink-sm'} onClick={() => setSelectedPlace('main_city')}>
              {commonShowQuery.data?.text.cityBack ?? 'city_back'}
            </Button>
          )}

          {selectedPlace === 'hospital' && !!hospital && <Hospital hospitalId={hospital.id} />}
          {selectedPlace === 'armory' && !!armory && <Armory armoryId={armory.id} />}
          {selectedPlace === 'bank' && !!bank && <Bank bankId={bank.id} />}
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
            size='small'
            italic
          />
        </div>

        {gameShowInfoQuery.derived.hasSubplace && (
          <List>
            {gameShowInfoQuery.data?.place?.subplaces?.map((x) => (
              <li key={`SubPlace_${x.type}`}>
                <Link onClick={() => setSelectedPlace(x.type as Location)}>{x.place?.name ?? 'subplace_name'}</Link>
              </li>
            ))}
            <li>
              <Link onClick={handleLeavePlace}>Odejít z města</Link>
            </li>
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

function useSetPlace(place?: Location) {
  const [selectedPlace, setSelectedPlace] = React.useState<Location>()

  useSetLocationBackgroundEffect(selectedPlace)

  React.useEffect(() => setSelectedPlace(place), [place])

  return { selectedPlace, setSelectedPlace }
}
