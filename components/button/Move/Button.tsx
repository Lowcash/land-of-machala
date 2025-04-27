'use client'

import { usePlayerMoveMutation, usePlayerShowQuery } from '@/hooks/api/use-player'

import { RxChevronUp, RxChevronDown, RxChevronLeft, RxChevronRight } from 'react-icons/rx'
import { Button } from '@/components/ui/button'

import { DIRECTIONS } from '@/config'

interface Props extends Pick<React.ComponentProps<typeof Button>, 'className' | 'disabled'> {
  direction: (typeof DIRECTIONS)[number]
}

export default function Move({ direction, ...p }: Props) {
  const playerShowQuery = usePlayerShowQuery()

  const playerMoveMutation = usePlayerMoveMutation()

  const handleMove = () => playerMoveMutation.mutate({ direction })

  return (
    <Button
      {...p}
      variant='warning'
      size='icon-lg'
      disabled={p.disabled || !playerShowQuery.data?.canMove}
      onClick={handleMove}
    >
      {direction === 'up' && <RxChevronUp size={'2em'} />}
      {direction === 'down' && <RxChevronDown size={'2em'} />}
      {direction === 'left' && <RxChevronLeft size={'2em'} />}
      {direction === 'right' && <RxChevronRight size={'2em'} />}
    </Button>
  )
}
