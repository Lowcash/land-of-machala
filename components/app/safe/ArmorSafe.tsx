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

export function ArmorSafe({ bankId, ...p }: SafeProps) {
  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const items = p.action === 'deposit' ? inventoryShowQuery.data?.armors : bankAccountShowQuery.data?.armors

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
            {},
            { className: 'text-center', content: commonShowQuery.data?.text.armor ?? 'safe_armor_armor' },
            { className: 'text-center', content: commonShowQuery.data?.text.stregth ?? 'safe_armor_strength' },
            { className: 'text-center', content: commonShowQuery.data?.text.agility ?? 'safe_armor_agility' },
            { className: 'text-center', content: commonShowQuery.data?.text.intelligence ?? 'safe_armor_intelligene' },
            { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'safe_armor_action' },
          ]}
          cells={items?.map((x: any) => [
            { className: 'text-left', content: x.armor.name },
            { className: 'text-center', content: x.armor.type },
            { className: 'text-center', content: x.armor.armor },
            { className: 'text-center', content: x.armor.strength },
            { className: 'text-center', content: x.armor.agility },
            { className: 'text-center', content: x.armor.intelligence },
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
