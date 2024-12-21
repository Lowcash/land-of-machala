'use client'

import { usePlayerMoveMutation } from '@/hooks/api/usePlayer'

import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

import { DIRECTIONS } from '@/const'

interface Props extends Pick<React.ComponentProps<typeof Button>, 'className'> {
  direction: (typeof DIRECTIONS)[number]
}

export default function Go({ direction, ...p }: Props) {
  const playerMoveMutation = usePlayerMoveMutation()

  return (
    <Button {...p} onClick={() => playerMoveMutation.mutate(direction)} variant='warning' size='iconLg'>
      {direction === 'up' && <FaChevronUp />}
      {direction === 'down' && <FaChevronDown />}
      {direction === 'left' && <FaChevronLeft />}
      {direction === 'right' && <FaChevronRight />}
    </Button>
  )
}
