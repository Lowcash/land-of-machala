'use client'

import i18n from '@/lib/i18n'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import Table from '@/components/table'
import Drink from './Drink'

export default function Potions() {
  const showInventory = useInventoryShowQuery()

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: i18n.t('consumable.efficiency') },
        { className: 'text-right', content: i18n.t('common.use') },
      ]}
      cells={showInventory.data?.potions.map((x) => [
        { className: 'text-left', content: x.potion.i18n_key },
        {
          className: 'text-center',
          content: `+${x.potion.hp_gain} ${i18n.t('common.hp')}`,
        },
        {
          className: 'text-right',
          content: <Drink inventoryConsumableId={x.id} />,
        },
      ])}
    />
  )
}
