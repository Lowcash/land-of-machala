import { showInventory } from '@/server/actions/inventory'

import * as S from './styles'
import { Card } from '@/styles/common-server'
import { H3 } from '@/styles/text-server'
import Back from './_components/Back'
import Weapons from './_components/Weapons'
import Armors from './_components/Armors'
import Potions from './_components/Potions'

export default async function Page() {
  const inventory = await showInventory()

  // const hasWeapons = inventory.weapons.length > 0
  // const hasArmors = inventory.armors.length > 0
  // const hasPotions = inventory.potions.length > 0

  // const hasItems = hasWeapons || hasArmors || hasPotions
  const hasItems = true
  return (
    <Card>
      <Back />
      <br />
      <br />
      {!hasItems && <H3>V batohu nic nemáš</H3>}
      {hasItems && (
        <>
          <H3>V batohu se nachází:</H3>
          <br />
          <S.Inventory>
            {/* {hasWeapons && (
              <>
                <br />
                <H3>Zbraně</H3>
                <br />
                <Weapons />
              </>
            )} */}
            {/* {hasArmors && (
              <>
                <br />
                <H3>Zbroje</H3>
                <br />
                <Armors />
              </>
            )}
            {hasPotions && (
              <>
                <br />
                <H3>Potiony</H3>
                <br />
                <Potions />
              </>
            )} */}
          </S.Inventory>
        </>
      )}
    </Card>
  )
}
