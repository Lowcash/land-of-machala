'use client'

import React from 'react'
import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import { Detail, Hero } from '@/styles/common'
import Action from '@/components/app/Action'
import Info from '@/components/app/Info'
import CharacterPlayer from '@/components/app/CharacterPlayer'
import CharacterEnemy from '@/components/app/CharacterEnemy'
import Enemy from '@/components/app/Enemy'
import Decision, { type DecisionSelectedEvent } from '@/components/app/Decision'

const DECISION = {
  ATTACK: 'attack',
  RUN_AWAY: 'run_away',
} as const

const PHASE = {
  START: 'start',
  ATTACK: 'attack',
  RUN_AWAY: 'run_away',
} as const

export default function Combat() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  const [phase, setPhase] = React.useState<(typeof PHASE)[keyof typeof PHASE]>(PHASE.START)

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.ATTACK:
        setPhase(PHASE.ATTACK)
        break
      case DECISION.RUN_AWAY:
        setPhase(PHASE.RUN_AWAY)
        break
    }
  }

  return (
    <>
      <Hero>
        <CharacterPlayer />
        <CharacterEnemy />
      </Hero>
      <Detail>
        <Info headers={[gameShowInfoQuery.data?.combat?.text?.enemyAppear ?? 'combat_enemy_appear']} />
        <div className='flex justify-between'>
          <Decision
            bottom={[
              { key: DECISION.ATTACK, text: gameShowInfoQuery.data?.combat?.text?.attack ?? 'combat_attack' },
              { key: DECISION.RUN_AWAY, text: gameShowInfoQuery.data?.combat?.text?.runAway ?? 'combat_run_away' },
            ]}
            onDecisionSelected={handleDecisionSelected}
          />
          <Enemy />
        </div>
      </Detail>

      {phase === PHASE.START && <Action type='combat_start' />}
      {phase === PHASE.ATTACK && <Action type='combat_attack' />}
      {phase === PHASE.RUN_AWAY && <Action type='combat_run_away' />}
    </>
  )
}
