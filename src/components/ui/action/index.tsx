'use client'

import { api } from '~/trpc/react'

import { Button } from '../button'

export default function Action() {
  const { data } = api.game.position.useQuery()

  return (
    <>
      {data?.enemy && (
        <div className='flex justify-between'>
          <Button>Útok</Button>
          <Button>Utéct</Button>
        </div>
      )}
    </>
  )
}
