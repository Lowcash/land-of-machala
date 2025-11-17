'use client'

import dynamic from 'next/dynamic'
import { useSetLocationBackgroundEffect } from '@/context/game-provider'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'
import type { SafeActionResultData } from '@/lib/safe-action-client-utils'
import type { show } from '@/app/actions/inventory'

import { Card } from '@/styles/common'
import { H3 } from '@/styles/typography'
import { Back } from '@/components/app/Back'

// Dynamic imports for inventory sections - reduces initial bundle
const Weapons = dynamic(() => import('./_components').then((mod) => ({ default: mod.Weapons })), {
  loading: () => <div>Loading weapons...</div>,
})
const Armors = dynamic(() => import('./_components').then((mod) => ({ default: mod.Armors })), {
  loading: () => <div>Loading armors...</div>,
})
const Potions = dynamic(() => import('./_components').then((mod) => ({ default: mod.Potions })), {
  loading: () => <div>Loading potions...</div>,
})

interface InventoryClientProps {
  initialData?: SafeActionResultData<typeof show>
}

export function InventoryClient({ initialData }: InventoryClientProps) {
  const inventoryShowQuery = useInventoryShowQuery(undefined, {
    initialData,
    staleTime: 0,
  })

  useSetLocationBackgroundEffect('inventory')

  const hasWeapons = (inventoryShowQuery.data?.weapons.length ?? 0) > 0
  const hasArmors = (inventoryShowQuery.data?.armors.length ?? 0) > 0
  const hasPotions = (inventoryShowQuery.data?.potions.length ?? 0) > 0

  const hasItems = hasWeapons || hasArmors || hasPotions

  return (
    <Card>
      <Back />

      {!hasItems ? (
        <H3>{inventoryShowQuery.data?.text.empty ?? 'inventory_empty'}</H3>
      ) : (
        <>
          <H3>{inventoryShowQuery.data?.text.content ?? 'inventory_content'}:</H3>

          {hasWeapons && (
            <Card.Inner>
              <H3 className='border-gra'>{inventoryShowQuery.data?.text.weapon_multi ?? 'inventory_weapon_multi'}</H3>
              <Weapons />
            </Card.Inner>
          )}
          {hasArmors && (
            <Card.Inner>
              <H3>{inventoryShowQuery.data?.text.armor_multi ?? 'inventory_armor_multi'}</H3>
              <Armors />
            </Card.Inner>
          )}
          {hasPotions && (
            <Card.Inner>
              <H3>{inventoryShowQuery.data?.text.potion_multi ?? 'inventory_potion_multi'}</H3>
              <Potions />
            </Card.Inner>
          )}
        </>
      )}
    </Card>
  )
}
