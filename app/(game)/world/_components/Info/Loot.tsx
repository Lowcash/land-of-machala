'use client'

import i18next from '@/lib/i18n'
import { useGameInfoQuery } from "@/hooks/api/use-game"

import { Text } from '@/styles/typography'
import { Card } from '@/styles/common'

export default function Loot() {
  const gameInfoQuery = useGameInfoQuery()

  const armors = gameInfoQuery.data?.loot?.armors_loot.map((x: any) => x.armor.name)
  const weapons = gameInfoQuery.data?.loot?.weapons_loot.map((x: any) => x.weapon.name)

  return (
    <Card>
      {i18next.t('loot.found')}:

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
        {gameInfoQuery.data?.loot?.money} {i18next.t('common.currency')}
      </Text>
    </Card>
  )
}