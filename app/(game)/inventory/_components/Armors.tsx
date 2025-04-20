'use client'

import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/table'
import Wear from '@/app/(game)/inventory/_components/Wear'
import Unwear from '@/app/(game)/inventory/_components/Unwear'

export default function Armors() {
  const inventoryShowQuery = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: inventoryShowQuery.data?.text.armor ?? 'armor_armor' },
        { className: 'text-center', content: inventoryShowQuery.data?.text.stregth ?? 'armor_stregth' },
        { className: 'text-center', content: inventoryShowQuery.data?.text.agility ?? 'armor_agility' },
        { className: 'text-center', content: inventoryShowQuery.data?.text.intelligence ?? 'armor_intelligence' },
        { className: 'text-center', content: inventoryShowQuery.data?.text.wear ?? 'armor_wear' },
      ]}
      cells={inventoryShowQuery.data?.armors.map((x) => [
        { className: 'text-left', content: x.armor.name },
        { className: 'text-center', content: x.armor.type },
        { className: 'text-center', content: x.armor.armor },
        { className: 'text-center', content: x.armor.strength },
        { className: 'text-center', content: x.armor.agility },
        { className: 'text-center', content: x.armor.intelligence },
        {
          className: 'text-center',
          content: (
            <>
              {!x.armed && <Wear type='armor' inventoryWearableId={x.id} />}
              {x.armed && <Unwear type='armor' inventoryWearableId={x.id} />}
            </>
          ),
        },
      ])}
    />
  )
}
