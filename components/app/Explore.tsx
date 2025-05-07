'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'

import { Detail, Hero } from '@/styles/common'
import Info from '@/components/app/Info'
import CharacterPlayer from '@/components/app/CharacterPlayer'

export default function Explore() {
  const commonShowQuery = useCommonShowQuery()

  return (
    <>
      <Hero>
        <CharacterPlayer />
      </Hero>
      <Detail>
        <Info header={commonShowQuery.data?.text?.worldExplore ?? 'game_world_explore'} />
      </Detail>
    </>
  )
}
