import { loc } from '@/local'
import { showInventory } from '@/server/actions/inventory'

import { Card } from '@/styles/common-server'
import { H3 } from '@/styles/text-server'
import Back from '@/app/(game)/world/_components/Back'
import Weapons from './_components/Weapons'
import Armors from './_components/Armors'
import Potions from './_components/Potions'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const inventory = await showInventory()

  const hasWeapons = inventory.weapons.length > 0
  const hasArmors = inventory.armors.length > 0
  const hasPotions = inventory.potions.length > 0

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
