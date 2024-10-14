'use client'

import { useShowInventoryQuery } from '@/hooks/inventory'

import Table from '@/components/table'
import Wear from './Wear'
import Unwear from './Unwear'

export default function Armors() {
  const showInventory = useShowInventoryQuery()

  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: 'Zbroj' },
        { className: 'text-center', content: 'Síla' },
        { className: 'text-center', content: 'Obratnost' },
        { className: 'text-center', content: 'Inteligence' },
        { className: 'text-center', content: 'Obléct' },
      ]}
      cells={showInventory.data?.armors.map((x) => [
        { className: 'text-left', content: x.armor.name },
        { className: 'text-center', content: x.armor.type },
        { className: 'text-center', content: x.armor.armor },
        { className: 'text-center', content: x.armor.strength },
        { className: 'text-center', content: x.armor.agility },
        { className: 'text-center', content: x.armor.intelligency },
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
