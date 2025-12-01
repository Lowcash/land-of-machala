'use client'

import React from 'react'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import { useBankShowQuery, useBankDepositItemMutation, useBankWithdrawItemMutation } from '@/hooks/api/use-bank'

import Alert from '@/components/Alert'
import Loading from '@/components/Loading'
import { Info } from '@/components/app/Info'
import { Decision, type DecisionSelectedEvent } from '@/components/app/Decision'
import {
  ArmorSafe,
  PotionSafe,
  WeaponSafe,
  MoneySafe,
  type SafeActionEvent,
  type SafeMoneyActionEvent,
  type SafeLeaveEvent,
} from '@/components/app/safe'

const SUBPLACE = {
  ARMOR_DEPOSIT: 'armor_deposit',
  WEAPON_DEPOSIT: 'weapon_deposit',
  POTION_DEPOSIT: 'potion_deposit',
  MONEY_DEPOSIT: 'money_deposit',
  ARMOR_WITHDRAW: 'armor_withdraw',
  WEAPON_WITHDRAW: 'weapon_withdraw',
  POTION_WITHDRAW: 'potion_withdraw',
  MONEY_WITHDRAW: 'money_withdraw',
} as const

const DECISION = {
  ...SUBPLACE,
  BACK: 'back',
} as const

interface Props {
  bankId: string

  onBankLeave?: () => void
}

export function Bank({ bankId, ...p }: Props) {
  const [subplace, setSubplace] = React.useState<(typeof SUBPLACE)[keyof typeof SUBPLACE]>()
  const [message, setMessage] = React.useState<string>()

  const commonShowQuery = useCommonShowQuery()
  const bankShowQuery = useBankShowQuery({ bankId })

  const depositItemMutation = useBankDepositItemMutation({
    onSuccess: () => setMessage(bankShowQuery.data?.text.depositSuccess ?? 'bank_deposit_success'),
    onError: () => setMessage(bankShowQuery.data?.text.depositOrWithdrawFailure ?? 'bank_deposit_or_witdraw_failure'),
  })
  const withdrawItemMutation = useBankWithdrawItemMutation({
    onSuccess: () => setMessage(bankShowQuery.data?.text.withdrawSuccess ?? 'bank_withdraw_success'),
    onError: () => setMessage(bankShowQuery.data?.text.depositOrWithdrawFailure ?? 'bank_deposit_or_witdraw_failure'),
  })

  const handleSafeAction: (type: 'armor' | 'weapon' | 'potion') => SafeActionEvent = (type) => {
    return (item, action) => {
      switch (action) {
        case 'deposit':
          depositItemMutation.mutate({ bankId, item: { id: item.id, type } })
          break
        case 'withdraw':
          withdrawItemMutation.mutate({ bankId, item: { id: item.id, type } })
          break
      }
    }
  }

  const handleSafeMoneyAction: SafeMoneyActionEvent = (money, action) => {
    switch (action) {
      case 'deposit':
        depositItemMutation.mutate({ bankId, money: Number(money) })
        break
      case 'withdraw':
        withdrawItemMutation.mutate({ bankId, money: Number(money) })
        break
    }
  }

  const handleSafeLeave: SafeLeaveEvent = () => setSubplace(undefined)

  const handleDecisionSelected: DecisionSelectedEvent = (decision) => {
    switch (decision?.key) {
      case DECISION.BACK:
        p.onBankLeave?.()
        break
      case DECISION.ARMOR_DEPOSIT:
        setSubplace(SUBPLACE.ARMOR_DEPOSIT)
        break
      case DECISION.WEAPON_DEPOSIT:
        setSubplace(SUBPLACE.WEAPON_DEPOSIT)
        break
      case DECISION.POTION_DEPOSIT:
        setSubplace(SUBPLACE.POTION_DEPOSIT)
        break
      case DECISION.MONEY_DEPOSIT:
        setSubplace(SUBPLACE.MONEY_DEPOSIT)
        break
      case DECISION.ARMOR_WITHDRAW:
        setSubplace(SUBPLACE.ARMOR_WITHDRAW)
        break
      case DECISION.WEAPON_WITHDRAW:
        setSubplace(SUBPLACE.WEAPON_WITHDRAW)
        break
      case DECISION.POTION_WITHDRAW:
        setSubplace(SUBPLACE.POTION_WITHDRAW)
        break
      case DECISION.MONEY_WITHDRAW:
        setSubplace(SUBPLACE.MONEY_WITHDRAW)
        break
    }
  }

  switch (subplace) {
    case SUBPLACE.ARMOR_DEPOSIT:
      return (
        <ArmorSafe
          bankId={bankId}
          action='deposit'
          onSafeAction={handleSafeAction('armor')}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.WEAPON_DEPOSIT:
      return (
        <WeaponSafe
          bankId={bankId}
          action='deposit'
          onSafeAction={handleSafeAction('weapon')}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.POTION_DEPOSIT:
      return (
        <PotionSafe
          bankId={bankId}
          action='deposit'
          onSafeAction={handleSafeAction('potion')}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.MONEY_DEPOSIT:
      return (
        <MoneySafe
          bankId={bankId}
          action='deposit'
          onSafeMoneyAction={handleSafeMoneyAction}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.ARMOR_WITHDRAW:
      return (
        <ArmorSafe
          bankId={bankId}
          action='withdraw'
          onSafeAction={handleSafeAction('armor')}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.WEAPON_WITHDRAW:
      return (
        <WeaponSafe
          bankId={bankId}
          action='withdraw'
          onSafeAction={handleSafeAction('weapon')}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.POTION_WITHDRAW:
      return (
        <PotionSafe
          bankId={bankId}
          action='withdraw'
          onSafeAction={handleSafeAction('potion')}
          onSafeLeave={handleSafeLeave}
        />
      )
    case SUBPLACE.MONEY_WITHDRAW:
      return (
        <MoneySafe
          bankId={bankId}
          action='withdraw'
          onSafeMoneyAction={handleSafeMoneyAction}
          onSafeLeave={handleSafeLeave}
        />
      )
  }

  if (bankShowQuery.isLoading) return <Loading position='local' />

  return (
    <>
      <Info
        headers={[bankShowQuery.data?.text.header ?? 'bank_header']}
        descriptions={[bankShowQuery.data?.text.description ?? 'bank_description']}
      />

      {message && (
        <Alert>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      )}

      <Decision
        top={[
          {
            key: DECISION.BACK,
            text: commonShowQuery.data?.text.cityBack ?? 'armory_city_back',
          },
        ]}
        bottom={[
          { key: DECISION.MONEY_DEPOSIT, text: bankShowQuery.data?.text.depositMoney ?? 'bank_deposit_money' },
          { key: DECISION.MONEY_WITHDRAW, text: bankShowQuery.data?.text.withdrawMoney ?? 'bank_withdraw_money' },
          { key: DECISION.WEAPON_DEPOSIT, text: bankShowQuery.data?.text.depositWeapon ?? 'bank_deposit_weapon' },
          { key: DECISION.WEAPON_WITHDRAW, text: bankShowQuery.data?.text.withdrawWeapon ?? 'bank_withdraw_weapon' },
          { key: DECISION.ARMOR_DEPOSIT, text: bankShowQuery.data?.text.depositArmor ?? 'bank_deposit_armor' },
          { key: DECISION.ARMOR_WITHDRAW, text: bankShowQuery.data?.text.withdrawArmor ?? 'bank_withdraw_armor' },
          { key: DECISION.POTION_DEPOSIT, text: bankShowQuery.data?.text.depositPotion ?? 'bank_deposit_potion' },
          { key: DECISION.POTION_WITHDRAW, text: bankShowQuery.data?.text.withdrawPotion ?? 'bank_withdraw_potion' },
        ]}
        onDecisionSelected={handleDecisionSelected}
      />
    </>
  )
}
