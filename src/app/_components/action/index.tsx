'use client'

import { api } from '~/trpc/react'

import { Flex } from '~/styles/flex'
import { Button } from '@mui/material'

export default function Action() {
  const { data } = api.game.position.useQuery()

  return (
    <>
      {data?.enemy && (
        <Flex justifyContent='space-between'>
          <Button>Útok</Button>
          <Button>Utéct</Button>
        </Flex>
      )}
    </>
  )
}
