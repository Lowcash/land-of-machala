'use client'

import i18n from '@/lib/i18n'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/table'
import Wear from './Wear'
import Unwear from './Unwear'

export default function Armors() {
  const showInventory = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: i18n.t('armor.header') },
        { className: 'text-center', content: i18n.t('stats.strength') },
        { className: 'text-center', content: i18n.t('stats.agility') },
        { className: 'text-center', content: i18n.t('stats.intelligence') },
        { className: 'text-center', content: i18n.t('common.wear') },
      ]}
      cells={showInventory.data?.armors.map((x) => [
        { className: 'text-left', content: x.armor.i18n_key },
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
