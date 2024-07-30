'use client'

import { move } from '@/app/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Direction, PropsWithChildrenAndClassName } from '@/types'

import { Button as Button_ } from '@/components/ui/button'

import { QUERY } from '@/const'

interface Props {
  direction: Direction
}

export default function Button({ children, className, ...p }: PropsWithChildrenAndClassName<Props>) {
  const queryClient = useQueryClient()

  const moveMutation = useMutation({
    mutationFn: move,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (p) => p.queryKey[0] === QUERY.PLAYER_INFO,
      })
    },
  })

  return (
    <Button_ className={className} onClick={() => moveMutation.mutate(p.direction)} variant='warning' size='iconLg'>
      {children}
    </Button_>
  )
}
