'use client'

import { RxReader, RxBackpack, RxMagicWand, RxGroup } from 'react-icons/rx'
import { ActionButton } from './ActionButton'

interface MenuActionsProps {
  inCombat?: boolean
  showGroupActions?: boolean
}

export function MenuActions({ showGroupActions = true }: MenuActionsProps) {
  return (
    <>
      {/* Group actions (left side) */}
      {showGroupActions && (
        <>
          <ActionButton className='col-start-2 row-start-1' icon={<RxGroup size='2em' />} />
          <ActionButton className='col-start-8 row-start-1' icon={<RxGroup size='2em' />} />
        </>
      )}

      {/* Main menu (right side) - separate container */}
    </>
  )
}

export function MainMenu({ inCombat = false }: { inCombat?: boolean }) {
  return (
    <div className='grid h-full grid-cols-1 grid-rows-3 justify-items-center'>
      {/* Quests */}
      <ActionButton className='col-start-1 row-start-1' icon={<RxReader size='2em' />} />
      {/* Talents */}
      <ActionButton className='col-start-1 row-start-2' icon={<RxMagicWand size='2em' />} disabled={inCombat} />
      {/* Inventory */}
      <ActionButton className='col-start-1 row-start-3' icon={<RxBackpack size='2em' />} disabled={inCombat} />
    </div>
  )
}
