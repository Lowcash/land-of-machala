'use client'

import { useGameShowInfoQuery } from '@/hooks/api/use-game'

import { Detail, Hero } from '@/styles/common'
import Decision from '@/components/app/Decision'
import Info from '@/components/app/Info'
import CharacterPlayer from '@/components/app/CharacterPlayer'

export default function LootClient() {
  const gameShowInfoQuery = useGameShowInfoQuery()

  const armors = gameShowInfoQuery.data?.loot?.armors_loot?.map((x) => x.text.reward).filter((x) => !!x)
  const weapons = gameShowInfoQuery.data?.loot?.weapons_loot?.map((x) => x.text.reward).filter((x) => !!x)

  const itemsLoot = [armors, weapons].flat().filter((x): x is string => !!x)

  return (
    <>
      <Hero>
        <CharacterPlayer />
      </Hero>
      <Detail>
        <Info
          header={gameShowInfoQuery.data?.loot?.text?.loot_found ?? 'game_loot_found'}
          description={[
            itemsLoot.join(', '),
            gameShowInfoQuery.data?.loot?.text?.reward_money ?? 'game_reward_money',
            gameShowInfoQuery.data?.loot?.text?.reward_xp ?? 'game_reward_xp',
          ]}
        />
        <Decision
          return={{ key: 'back', text: 'pripraven odejit' }}
          decisions={itemsLoot.map((x) => ({ key: x, text: `sebrat ${x}` }))}
        />
      </Detail>
    </>
  )
}
