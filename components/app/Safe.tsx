'use client'

import React from 'react'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useBankShowAccountQuery, type BankAccountItem } from '@/hooks/api/use-bank'
import { useInventoryShowQuery, type InventoryItem } from '@/hooks/api/use-inventory'

import { Card } from '@/styles/common'
import { Input, Text } from '@/styles/typography'
import { Button } from '@/components/ui/button'
import { RxPaperPlane } from 'react-icons/rx'
import Table from '@/components/Table'
import Decision, { type DecisionSelectedEvent } from '@/components/app/Decision'

export type SafeActionEvent = (item: BankAccountItem | InventoryItem, action: Action) => void
export type SafeMoneyActionEvent = (money: string, action: Action) => void
export type SafeLeaveEvent = () => void

type Action = 'deposit' | 'withdraw'

const DECISION = {
  BACK: 'back',
} as const

interface Props {
  bankId: string

  action: Action

  onSafeAction?: SafeActionEvent
  onSafeMoneyAction?: SafeMoneyActionEvent
  onSafeLeave?: SafeLeaveEvent
}

export function ArmorSafe({ bankId, ...p }: Props) {
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
          cells={items?.map((x) => [
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

export function WeaponSafe({ bankId, ...p }: Props) {
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

export function PotionSafe({ bankId, ...p }: Props) {
  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankAccountShowQuery = useBankShowAccountQuery({ bankId })

  const items = p.action === 'deposit' ? inventoryShowQuery.data?.potions : bankAccountShowQuery.data?.potions

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
            { className: 'text-center', content: commonShowQuery.data?.text.efficiency ?? 'safe_potion_efficiency' },
            { className: 'text-right', content: commonShowQuery.data?.text[p.action] ?? 'safe_potion_action' },
          ]}
          cells={items?.map((x) => [
            { className: 'text-left', content: x.potion.name },
            {
              className: 'text-center',
              content: `+${x.potion.hp_gain} HP`,
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

export function MoneySafe({ bankId, ...p }: Props) {
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
