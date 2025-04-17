'use client'

import i18next from '@/lib/i18n'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/table'
import Wear from './Wear'
import Unwear from './Unwear'

export default function Weapons() {
  const showInventory = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: i18next.t('stats.damage') },
        { className: 'text-center', content: `${i18next.t('common.wear')} (${i18next.t('weapon.left_hand')})` },
        { className: 'text-center', content: `${i18next.t('common.wear')} (${i18next.t('weapon.right_hand')})` },
      ]}
      cells={showInventory.data?.weapons.map((x) => [
        { className: 'text-left', content: x.weapon.i18n_key },
        {
          className: 'text-center',
          content: (
            <>
              {x.weapon.damage_from}-{x.weapon.damage_to}
            </>
          ),
        },
        {
          className: 'text-center',
          content: (
            <>
              {!x.armed_left && <Wear type='left_weapon' inventoryWearableId={x.id} />}
              {x.armed_left && <Unwear type='weapon' inventoryWearableId={x.id} />}
            </>
          ),
        },
        {
          className: 'text-center',
          content: (
            <>
              {!x.armed_right && <Wear type='right_weapon' inventoryWearableId={x.id} />}
              {x.armed_right && <Unwear type='weapon' inventoryWearableId={x.id} />}
            </>
          ),
        },
      ])}
    />
  )
}
