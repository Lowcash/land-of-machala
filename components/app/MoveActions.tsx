'use client'

import { usePlayerMoveMutation } from '@/hooks/api/use-player'
import { RxChevronUp, RxChevronDown, RxChevronLeft, RxChevronRight } from 'react-icons/rx'
import { ActionButton } from './ActionButton'
import { DIRECTIONS } from '@/config'

interface MoveActionsProps {
  disabled?: boolean
}

export function MoveActions({ disabled = false }: MoveActionsProps) {
  const playerMoveMutation = usePlayerMoveMutation()

  const handleMove = (direction: (typeof DIRECTIONS)[number]) => playerMoveMutation.mutate({ direction })

  return (
    <>
      {/* Up */}
      <ActionButton
        className='col-start-5 row-start-1'
        icon={<RxChevronUp size='2em' />}
        onClick={() => handleMove('up')}
        disabled={disabled}
      />
      {/* Down */}
      <ActionButton
        className='col-start-5 row-start-3'
        icon={<RxChevronDown size='2em' />}
        onClick={() => handleMove('down')}
        disabled={disabled}
      />
      {/* Left */}
      <ActionButton
        className='col-start-3 row-start-2'
        icon={<RxChevronLeft size='2em' />}
        onClick={() => handleMove('left')}
        disabled={disabled}
      />
      {/* Right */}
      <ActionButton
        className='col-start-7 row-start-2'
        icon={<RxChevronRight size='2em' />}
        onClick={() => handleMove('right')}
        disabled={disabled}
      />
    </>
  )
}
