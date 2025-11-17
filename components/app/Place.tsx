'use client'

import React from 'react'
import type { Location } from '@/types'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import { Detail, Hero } from '@/styles/common'
import { Hospital } from '@/components/app/Hospital'
import { Armory } from '@/components/app/Armory'
import { Bank } from '@/components/app/Bank'

import { Action } from '@/components/app/Action'
import { Info } from '@/components/app/Info'
import { Decision, type DecisionSelectedEvent } from '@/components/app/Decision'
import { CharacterPlayer } from '@/components/app/CharacterPlayer'

export type EnterPlaceChangeEvent = (place?: Location) => void

const DECISION = {
  LEAVE: 'leave',
  ENTER: 'enter',
} as const

const PHASE = {
  READY_ENTER: 'ready_enter',
  ALREADY_ENTERED: 'already_entered',
} as const

interface Props {
  enteredPlace?: Location
  onEnteredPlaceChange?: EnterPlaceChangeEvent
  onPlaceLeave?: () => void
}

export function Place(p: Props) {
  const commonShowQuery = useCommonShowQuery()
  const gameShowInfoQuery = useGameShowInfoQuery()

  const [enteredPlace, setEnteredPlace] = React.useState<Location | undefined>(p.enteredPlace)
  const [phase, setPhase] = React.useState<(typeof PHASE)[keyof typeof PHASE]>()
  const [canLeavePlace, setCanLeavePlace] = React.useState(true)

  React.useEffect(() => {
    const isPlaceToStop = p.enteredPlace === 'main_city'

    if (!isPlaceToStop) return

    setPhase(PHASE.READY_ENTER)
  }, [p.enteredPlace])

  React.useEffect(() => {
    switch (phase) {
      case PHASE.READY_ENTER:
        setCanLeavePlace(true)
        return
      case PHASE.ALREADY_ENTERED:
        setCanLeavePlace(false)
        return
    }
  }, [phase])

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    if (decision?.key === 'main_city') {
      setPhase(PHASE.ALREADY_ENTERED)
    }

    switch (decision?.key) {
      case DECISION.ENTER:
        setPhase(PHASE.ALREADY_ENTERED)
        return
      case DECISION.LEAVE:
        setPhase(PHASE.READY_ENTER)
        return
    }

    p.onEnteredPlaceChange?.(decision?.key as Location)
    setEnteredPlace(decision?.key as Location)
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
          {enteredPlace === 'hospital' && !!hospital && (
            <Hospital hospitalId={hospital.id} onHospitalLeave={() => handleDecisionSelected({ key: 'main_city' })} />
          )}
          {enteredPlace === 'armory' && !!armory && (
            <Armory armoryId={armory.id} onArmoryLeave={() => handleDecisionSelected({ key: 'main_city' })} />
          )}
          {enteredPlace === 'bank' && !!bank && (
            <Bank bankId={bank.id} onBankLeave={() => handleDecisionSelected({ key: 'main_city' })} />
          )}
        </Detail>
        <Action type={canLeavePlace ? 'move' : 'move_disabled'} />
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
          headers={[gameShowInfoQuery.data?.place?.text?.header ?? 'place_header']}
          descriptions={[gameShowInfoQuery.data?.place?.text?.description ?? 'place_description']}
        />
        <Decision
          top={[
            phase === PHASE.ALREADY_ENTERED && {
              key: DECISION.LEAVE,
              text: commonShowQuery.data?.text.cityLeave ?? 'place_leave',
            },
            phase === PHASE.READY_ENTER && {
              key: DECISION.ENTER,
              text: commonShowQuery.data?.text.cityEnter ?? 'place_enter',
            },
          ].filter((x) => !!x)}
          bottom={
            phase === PHASE.ALREADY_ENTERED
              ? gameShowInfoQuery.data?.place?.subplaces?.map((x) => ({
                  key: x.type,
                  text: x.place?.name ?? 'subplace_name',
                }))
              : []
          }
          onDecisionSelected={handleDecisionSelected}
        />
      </Detail>
      <Action type={canLeavePlace ? 'move' : 'move_disabled'} />
    </>
  )
}
