'use client'

import React from 'react'
import { api } from '@/trpc/react'
import { Direction } from '@/types'

import { Button } from '@/components/ui/button'

interface Props {
  direction: Direction
  className?: string
}

export default function Move({ children, ...p }: React.PropsWithChildren<Props>) {
  const { player, game } = api.useUtils()

  const moveMutation = api.player.move.useMutation({
    onSettled: () => {
      player.info.invalidate()
      game.info.invalidate()
    },
  })

  return (
    <Button className={p.className} onClick={() => moveMutation.mutate(p.direction)} variant='warning' size='iconLg'>
      {children}
    </Button>
  )
}
