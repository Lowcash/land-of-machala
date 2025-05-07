'use client'

import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import { Detail, Hero } from '@/styles/common'
// import Decision from '@/components/app/Decision'
import Info from '@/components/app/Info'
import CharacterPlayer from '@/components/app/CharacterPlayer'

export default function Combat() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  return (
    <>
      <Hero>
        <CharacterPlayer />
      </Hero>
      <Detail>
        <Info header={gameShowInfoQuery.data?.combat?.text?.enemyAppear ?? 'game_enemy_appear'} />
        {/* <Decision
          return={{ key: 'back', text: 'pripraven odejit' }}
          decisions={itemsLoot.map((x) => ({ key: x, text: `sebrat ${x}` }))}
        /> */}
      </Detail>
    </>
  )
}
