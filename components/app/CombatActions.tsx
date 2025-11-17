'use client'

import { useGameAttackMutation } from '@/hooks/api/use-game'
import { RxHobbyKnife } from 'react-icons/rx'
import { ActionButton } from './ActionButton'

export function CombatActions() {
  const attackMutation = useGameAttackMutation()

  const handleAttack = () => attackMutation.mutate()

  return (
    <>
      {/* Attack 1 */}
      <ActionButton
        className='col-start-2 row-start-3'
        variant='default'
        icon={<RxHobbyKnife size='2em' />}
        onClick={handleAttack}
      />
      {/* Attack 2 */}
      <ActionButton
        className='col-start-4 row-start-3'
        variant='default'
        icon={<RxHobbyKnife size='2em' />}
        onClick={handleAttack}
      />
      {/* Attack 3 */}
      <ActionButton
        className='col-start-6 row-start-3'
        variant='default'
        icon={<RxHobbyKnife size='2em' />}
        onClick={handleAttack}
      />
      {/* Attack 4 */}
      <ActionButton
        className='col-start-8 row-start-3'
        variant='default'
        icon={<RxHobbyKnife size='2em' />}
        onClick={handleAttack}
      />
    </>
  )
}
