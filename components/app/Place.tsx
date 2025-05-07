'ues client'

import React from 'react'
import type { Location } from '@/types'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import { Detail, Hero } from '@/styles/common'
import Hospital from '@/app/(game)/world/_components/Info/Place/Hospital'
import Armory from '@/app/(game)/world/_components/Info/Place/Armory'
import Bank from '@/app/(game)/world/_components/Info/Place/Bank'

import Action from '@/components/app/Action'
import Info from '@/components/app/Info'
import Decision, { type DecisionSelectedEvent } from '@/components/app/Decision'
import CharacterPlayer from '@/components/app/CharacterPlayer'

export type EnterPlaceChangeEvent = (place?: Location) => void

interface Props {
  enteredPlace?: Location
  onEnteredPlaceChange?: EnterPlaceChangeEvent
}

export default function Place(p: Props) {
  const commonShowQuery = useCommonShowQuery()
  const gameShowInfoQuery = useGameShowInfoQuery()

  const [enteredPlace, setEnteredPlace] = React.useState<Location | undefined>(p.enteredPlace)

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    const location = decision?.key as Location | undefined

    p.onEnteredPlaceChange?.(location)
    setEnteredPlace(location)
  }

  if (enteredPlace === 'hospital' || enteredPlace === 'armory' || enteredPlace === 'bank') {
    const hospital = gameShowInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'hospital')?.place
    const armory = gameShowInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'armory')?.place
    const bank = gameShowInfoQuery.data?.place?.subplaces?.find((x) => x.type === 'bank')?.place

    return (
      <>
        <Hero>
          <CharacterPlayer />
        </Hero>
        <Detail>
          {/* {gameShowInfoQuery.derived.hasDefeated ? (
            <Text
              dangerouslySetInnerHTML={{
                __html: gameShowInfoQuery.data?.player?.text?.defeated ?? 'game_player_defeated',
              }}
            />
          ) : (
            // TODO "main_city" is tempoprary solution
            <Button variant='warning' size={'shrink-sm'} onClick={() => handleEnteredPlaceChange('main_city')}>
              {commonShowQuery.data?.text.cityBack ?? 'city_back'}
            </Button>
          )} */}

          {enteredPlace === 'hospital' && !!hospital && (
            <Hospital hospitalId={hospital.id} onHospitalLeave={() => handleDecisionSelected({ key: 'main_city' })} />
          )}
          {/* {enteredPlace === 'armory' && !!armory && <Armory armoryId={armory.id} />}
          {enteredPlace === 'bank' && !!bank && <Bank bankId={bank.id} />} */}
        </Detail>
        <Action />
      </>
    )
  }

  return (
    <>
      <Hero>
        <CharacterPlayer />
      </Hero>
      <Detail>
        <Info
          header={gameShowInfoQuery.data?.place?.text?.header ?? 'place_header'}
          description={[gameShowInfoQuery.data?.place?.text?.description ?? 'place_description']}
        />
        <Decision
          return={{
            key: 'back',
            text: commonShowQuery.data?.text.cityLeave ?? 'place_leave',
          }}
          decisions={
            gameShowInfoQuery.data?.place?.subplaces?.map((x) => ({
              key: x.type,
              text: x.place?.name ?? 'subplace_name',
            })) ?? []
          }
          onDecisionSelected={handleDecisionSelected}
        />
      </Detail>
      <Action />
    </>
  )
}
