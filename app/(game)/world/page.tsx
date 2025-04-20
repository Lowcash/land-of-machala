'use client'

import { useBackground } from '@/context/game-provider'
import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import Action from './_components/Action'
import Info from './_components/Info'

export default function Page() {
  const gameInfoQuery = useGameInfoShowQuery()
  
  const hasPlace = !!gameInfoQuery.data?.place
  
  useBackground(hasPlace ? 'city' : 'forest')

  return (
    <>
      <Info />
      <Action />
    </>
  )
}

