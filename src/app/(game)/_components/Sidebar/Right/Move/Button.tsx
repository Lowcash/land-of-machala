'use client'

import { usePlayerMoveMutation, usePlayerQuery } from '@/hooks/api/usePlayer'

import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

import { DIRECTIONS } from '@/const'

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
      {direction === 'up' && <FaChevronUp />}
      {direction === 'down' && <FaChevronDown />}
      {direction === 'left' && <FaChevronLeft />}
      {direction === 'right' && <FaChevronRight />}
    </Button>
  )
}
