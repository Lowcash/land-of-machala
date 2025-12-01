'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'

import { Detail, Hero } from '@/styles/common'
import { Action } from '@/components/app/Action'
import { Info } from '@/components/app/Info'
import { CharacterPlayer } from '@/components/app/CharacterPlayer'

export function Explore() {
  const commonShowQuery = useCommonShowQuery()

  return (
    <>
      <Hero>
        <CharacterPlayer />
      </Hero>
      <Detail>
        <Info headers={[commonShowQuery.data?.text?.worldExplore ?? 'game_world_explore']} />
      </Detail>
      <Action />
    </>
  )
}
