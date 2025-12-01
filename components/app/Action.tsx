'use client'

import { Footer } from '@/styles/common'
import { MoveActions } from './MoveActions'
import { CombatActions } from './CombatActions'
import { MenuActions, MainMenu } from './MenuActions'

interface Props {
  type?: 'move' | 'move_disabled' | 'combat_start' | 'combat_attack' | 'combat_run_away'
}

export function Action({ type = 'move' }: Props) {
  const showMoveActions = type === 'move' || type === 'move_disabled' || type === 'combat_run_away'
  const showCombatActions = type === 'combat_attack'
  const inCombat = type === 'combat_start' || type === 'combat_attack' || type === 'combat_run_away'
  const moveDisabled = type === 'move_disabled'

  return (
    <Footer>
      <div className='grid h-full w-[15rem] grid-cols-9 grid-rows-3 justify-items-center'>
        {showMoveActions && <MoveActions disabled={moveDisabled} />}
        {showCombatActions && <CombatActions />}
        <MenuActions inCombat={inCombat} />
      </div>

      <MainMenu inCombat={inCombat} />
    </Footer>
  )
}
