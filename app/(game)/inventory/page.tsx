'use client'

import { loc } from '@/lib/localization'
import { useBackground } from '@/context/game-provider'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import { Card } from '@/styles/common'
import { H3 } from '@/styles/typography'
import Back from '@/app/(game)/world/_components/Back'
import Weapons from './_components/Weapons'
import Armors from './_components/Armors'
import Potions from './_components/Potions'

export default function Page() {
  useBackground('inventory')

  const inventoryShowQuery = useInventoryShowQuery()

  const hasWeapons = (inventoryShowQuery.data?.weapons.length ?? 0) > 0
  const hasArmors = (inventoryShowQuery.data?.armors.length ?? 0) > 0
  const hasPotions = (inventoryShowQuery.data?.potions.length ?? 0) > 0

  const hasItems = hasWeapons || hasArmors || hasPotions

  return (
    <Card>
      <Back />

      {!hasItems && <H3>{loc.inventory.empty}</H3>}

      {hasItems && (
        <>
          <H3>{loc.inventory.found}:</H3>

          {hasWeapons && (
            <Card.Inner>
              <H3>{loc.weapon.header_multi}</H3>
              <Weapons />
            </Card.Inner>
          )}
          {hasArmors && (
            <Card.Inner>
              <H3>{loc.armor.header_multi}</H3>
              <Armors />
            </Card.Inner>
          )}
          {hasPotions && (
            <Card.Inner>
              <H3>{loc.potion.header_multi}</H3>
              <Potions />
            </Card.Inner>
          )}
        </>
      )}
    </Card>
  )
}
