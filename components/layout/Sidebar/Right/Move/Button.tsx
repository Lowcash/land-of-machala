'use client'

import { usePlayerMoveMutation, usePlayerQuery } from '@/hooks/api/use-player'

import { RxChevronUp, RxChevronDown, RxChevronLeft, RxChevronRight } from 'react-icons/rx'
import { Button } from '@/components/ui/button'

import { DIRECTIONS } from '@/config'

interface Props extends Pick<React.ComponentProps<typeof Button>, 'className' | 'disabled'> {
  direction: (typeof DIRECTIONS)[number]
}

export default function Go({ direction, ...p }: Props) {
  const playerQuery = usePlayerQuery()
  const playerMoveMutation = usePlayerMoveMutation()

  return (
    <Button
      {...p}
      variant='warning'
      size='icon-lg'
      disabled={p.disabled || !playerQuery.data?.canMove}
      onClick={() => playerMoveMutation.mutate({ direction })}
    >
      {direction === 'up' && <RxChevronUp size={'2em'} />}
      {direction === 'down' && <RxChevronDown size={'2em'} />}
      {direction === 'left' && <RxChevronLeft size={'2em'} />}
      {direction === 'right' && <RxChevronRight size={'2em'} />}
    </Button>
  )
}
