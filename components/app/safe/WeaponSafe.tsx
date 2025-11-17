'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useBankShowAccountQuery } from '@/hooks/api/use-bank'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import { Card } from '@/styles/common'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/Table'
import { Decision, type DecisionSelectedEvent } from '@/components/app/Decision'

import { DECISION, type SafeProps } from './types'

export function WeaponSafe({ bankId, ...p }: SafeProps) {
  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const items = p.action === 'deposit' ? inventoryShowQuery.data?.weapons : bankAccountShowQuery.data?.weapons

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onSafeLeave?.()
        break
    }
  }

  return (
    <>
      <Decision
        top={[
          {
            key: DECISION.BACK,
            text: commonShowQuery.data?.text.back ?? 'safe_back',
          },
        ]}
        onDecisionSelected={handleDecisionSelected}
      />

      <Card>
        <Table
          columns={[
            {},
            { className: 'text-center', content: commonShowQuery.data?.text.damage ?? 'safe_weapon_damage' },
            { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'safe_weapon_action' },
          ]}
          cells={items?.map((x) => [
            { className: 'text-left', content: x.weapon.name },
            {
              className: 'text-center',
              content: (
                <>
                  {x.weapon.damage_from}-{x.weapon.damage_to}
                </>
              ),
            },
            {
              className: 'text-right',
              content: (
                <Button variant='secondary' onClick={() => p.onSafeAction?.(x, p.action)}>
                  <RxPaperPlane />
                </Button>
              ),
            },
          ])}
        />
      </Card>
    </>
  )
}
