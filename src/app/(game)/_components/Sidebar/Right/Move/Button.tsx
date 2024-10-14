'use client'

import type { Direction, PropsWithChildrenAndClassName } from '@/types'
import { usePlayerMoveMutation } from '@/hooks/api/usePlayer'

import { Button as Button_ } from '@/components/ui/button'

interface Props {
  direction: Direction
}

export default function Button({ children, className, ...p }: PropsWithChildrenAndClassName<Props>) {
  const playerMoveMutation = usePlayerMoveMutation()

  const handleButtonClick = () => playerMoveMutation.mutate(p.direction)

  return (
    <Button_ className={className} onClick={handleButtonClick} variant='warning' size='iconLg'>
      {children}
    </Button_>
  )
}
