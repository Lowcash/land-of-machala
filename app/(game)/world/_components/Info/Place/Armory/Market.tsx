import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useArmoryShowQuery, type ArmoryItem } from '@/hooks/api/use-armory'

import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/table'

type Action = 'buy' | 'sell'

interface Props {
  armoryId: string

  action: Action
  onAction: (item: ArmoryItem, action: Action) => void
}

export function ArmorMarket({ armoryId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const items = p.action === 'buy' ? armoryShowQuery.data?.buyArmors : armoryShowQuery.data?.sellArmors

  return (
    <Table
      columns={[
        {},
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.armor ?? 'armor_market_armor' },
        { className: 'text-center', content: commonShowQuery.data?.text.stregth ?? 'armor_market_stregth' },
        { className: 'text-center', content: commonShowQuery.data?.text.agility ?? 'armor_market_agility' },
        { className: 'text-center', content: commonShowQuery.data?.text.intelligence ?? 'armor_market_intelligence' },
        { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'armor_market_price' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'armor_market_action' },
      ]}
      cells={items?.map((x) => [
        { className: 'text-left', content: x.name },
        { className: 'text-center', content: x.type },
        { className: 'text-center', content: x.armor },
        { className: 'text-center', content: x.strength },
        { className: 'text-center', content: x.agility },
        { className: 'text-center', content: x.intelligence },
        {
          className: 'text-right',
          content: <Text>{x.text.price}</Text>,
        },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onAction?.(x, p.action)}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}

export function WeaponMarket({ armoryId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const armoryShowQuery = useArmoryShowQuery({ armoryId })

  const items = p.action === 'buy' ? armoryShowQuery.data?.buyWeapons : armoryShowQuery.data?.sellWeapons

  return (
    <Table
      columns={[
        {},
        { className: 'text-center', content: commonShowQuery.data?.text.damage ?? 'weapon_market_damage' },
        { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'weapon_market_price' },
        { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'weapon_market_action' },
      ]}
      cells={items?.map((x) => [
        { className: 'text-left', content: x.name },
        {
          className: 'text-center',
          content: (
            <>
              {x.damage_from}-{x.damage_to}
            </>
          ),
        },
        {
          className: 'text-right',
          content: <Text>{x.text.price}</Text>,
        },
        {
          className: 'text-right',
          content: (
            <Button variant='secondary' onClick={() => p.onAction?.(x, p.action)}>
              <RxPaperPlane />
            </Button>
          ),
        },
      ])}
    />
  )
}
