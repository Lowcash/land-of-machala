'use client'

import { loc } from '@/lib/localization'
import { useGameInfoQuery } from "@/hooks/api/use-game"

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'

export default function Loot() {
  const gameInfoQuery = useGameInfoQuery()

  const armors = gameInfoQuery.data?.loot?.armors_loot.map((x: any) => x.armor.name)
  const weapons = gameInfoQuery.data?.loot?.weapons_loot.map((x: any) => x.weapon.name)

  return (
    <Card>
      {loc.loot.found}:

      {armors?.map((x: string, idx: number) => (
        <Text key={`LootArmor_${idx}`}>
          {x} <br />
        </Text>
      ))}
      {weapons?.map((x: string, idx: number) => (
        <Text key={`LootWeapon_${idx}`}>
          {x} <br />
        </Text>
      ))}

      <Text>
        {gameInfoQuery.data?.loot?.money} {loc.common.currency}
      </Text>
    </Card>
  )
}