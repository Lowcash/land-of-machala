'use client'

import { useGameInfoShowQuery } from '@/hooks/api/use-game'

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'

export default function Loot() {
  const gameInfoShowQuery = useGameInfoShowQuery()

  const armors = gameInfoShowQuery.data?.loot?.armors_loot?.map((x) => x.armor.name)
  const weapons = gameInfoShowQuery.data?.loot?.weapons_loot?.map((x) => x.weapon.name)

  return (
    <Card>
      {gameInfoShowQuery.data?.text?.loot_found ?? 'game_loot_found'}:
      <div className='flex flex-col'>
        {armors?.map((x: string, idx: number) => <Text key={`LootArmor_${idx}`}>{x}</Text>)}
        {weapons?.map((x: string, idx: number) => <Text key={`LootWeapon_${idx}`}>{x}</Text>)}
      </div>
      <Text>{gameInfoShowQuery.data?.text?.reward ?? 'game_loot_reward'}</Text>
    </Card>
  )
}
