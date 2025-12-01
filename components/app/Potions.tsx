'use client'

import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useHospitalShowQuery, type HospitalPotion } from '@/hooks/api/use-hospital'

import { Card } from '@/styles/common'
import { Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/Table'
import { Decision, type DecisionSelectedEvent } from '@/components/app/Decision'

export type PotionsActionEvent = (potion: HospitalPotion) => void
export type PotionsLeaveEvent = () => void

const DECISION = {
  BACK: 'back',
} as const

interface Props {
  hospitalId: string
  onPotionsAction?: PotionsActionEvent
  onPotionsLeave?: PotionsLeaveEvent
}

export function Potions({ hospitalId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const hospitalShowQuery = useHospitalShowQuery({ hospitalId })

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onPotionsLeave?.()
        break
    }
  }

  return (
    <>
      <Decision
        top={[
          {
            key: DECISION.BACK,
            text: commonShowQuery.data?.text.back ?? 'potions_back',
          },
        ]}
        onDecisionSelected={handleDecisionSelected}
      />

      <Card>
        <Table
          columns={[
            {},
            { className: 'text-center', content: commonShowQuery.data?.text.efficiency ?? 'potion_efficiency' },
            { className: 'text-right', content: commonShowQuery.data?.text.price ?? 'potion_price' },
            { className: 'text-right', content: commonShowQuery.data?.text.buy ?? 'potion_buy' },
          ]}
          cells={hospitalShowQuery.data?.potions_hospital?.map((x: any) => [
            { className: 'text-left', content: x.potion.name },
            {
              className: 'text-center',
              content: x.potion.text.efficiency ?? 'potion_efficiency',
            },
            {
              className: 'text-right',
              content: <Text>{x.potion.text.price ?? 'potion_price'}</Text>,
            },
            {
              className: 'text-right',
              content: (
                <Button variant='secondary' onClick={() => p.onPotionsAction?.(x)}>
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
