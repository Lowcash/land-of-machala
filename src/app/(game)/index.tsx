'use client'

import { api } from '@/trpc/react'

import Play from './(play)'
import Create from './(create)'

export default function ({ children }: React.PropsWithChildren) {
  const { data: info, isLoading } = api.player.info.useQuery()

  const hasCharacter = Boolean(info?.race) && Boolean(info?.profession)

  if (isLoading) return <></>

  return (
    <>
      {!hasCharacter && <Create />}
      {hasCharacter && <Play>{children}</Play>}
    </>
  )
}
