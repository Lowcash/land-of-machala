'use client'

import React from 'react'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useBankShowAccountQuery } from '@/hooks/api/use-bank'

import { Card } from '@/styles/common'
import { Input, Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { Decision, type DecisionSelectedEvent } from '@/components/app/Decision'

import { DECISION, type SafeProps } from './types'

export function MoneySafe({ bankId, ...p }: SafeProps) {
  const commonShowQuery = useCommonShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const moneyInputRef = React.useRef<React.ComponentRef<'input'>>(null)

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
        <Text>{bankAccountShowQuery.data?.money ?? 0}</Text>

        <div className='flex space-x-2'>
          <Input ref={moneyInputRef} type='number' defaultValue={0} />
          <Button
            variant='destructive'
            onClick={() => {
              if (!moneyInputRef.current?.value) return

              p.onSafeMoneyAction?.(moneyInputRef.current?.value, p.action)
              moneyInputRef.current.value = '0'
            }}
          >
            {commonShowQuery.data?.text.deposit ?? 'safe_money_action'}
          </Button>
        </div>
      </Card>
    </>
  )
}
