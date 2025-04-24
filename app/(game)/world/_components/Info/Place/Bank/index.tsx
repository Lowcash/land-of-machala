'use client'

import React from 'react'
import { useCommonShowQuery } from '@/hooks/api/use-common'
import {
  useBankShowQuery,
  useBankShowAccountQuery,
  useBankDepositItemMutation,
  useBankWithdrawItemMutation,
} from '@/hooks/api/use-bank'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import { ArmorSafe, PotionSafe, WeaponSafe } from './Safe'
import { H3, Input, Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Loading'
import Alert from '@/components/Alert'

type ArmorSafeOnAction = React.ComponentProps<typeof ArmorSafe>['onAction']
type WeaponSafeOnAction = React.ComponentProps<typeof WeaponSafe>['onAction']
type PotionSafeOnAction = React.ComponentProps<typeof PotionSafe>['onAction']

interface Props {
  bankId: string
}

export default function Bank({ bankId }: Props) {
  const [message, setMessage] = React.useState<string>()

  const commonShowQuery = useCommonShowQuery()
  const inventoryShowQuery = useInventoryShowQuery()
  const bankShowQuery = useBankShowQuery({ bankId })
  const bankShowAccountQuery = useBankShowAccountQuery({ bankId })

  const depositItemMutation = useBankDepositItemMutation({
    onSuccess: () => setMessage(bankShowQuery.data?.text.depositSuccess ?? 'bank_deposit_success'),
    onError: () => setMessage(bankShowQuery.data?.text.depositOrWithdrawFailure ?? 'bank_deposit_or_witdraw_failure'),
  })
  const withdrawItemMutation = useBankWithdrawItemMutation({
    onSuccess: () => setMessage(bankShowQuery.data?.text.withdrawSuccess ?? 'bank_withdraw_success'),
    onError: () => setMessage(bankShowQuery.data?.text.depositOrWithdrawFailure ?? 'bank_deposit_or_witdraw_failure'),
  })

  const depositMoneyRef = React.useRef<React.ComponentRef<'input'>>(null)
  const withdrawMoneyRef = React.useRef<React.ComponentRef<'input'>>(null)

  if (bankShowQuery.isLoading) return <Loading position='local' />

  const handleAction: (
    type: 'armor' | 'weapon' | 'potion',
  ) => ArmorSafeOnAction | WeaponSafeOnAction | PotionSafeOnAction = (type) => {
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

  const handleMoneyAction = (action: 'deposit' | 'withdraw') => {
    switch (action) {
      case 'deposit':
        if (!depositMoneyRef.current?.value === undefined) return

        depositItemMutation.mutate({ bankId, money: Number(depositMoneyRef.current!.value) })
        depositMoneyRef.current!.value = '0'
        break
      case 'withdraw':
        if (!withdrawMoneyRef.current?.value === undefined) return

        withdrawItemMutation.mutate({ bankId, money: Number(withdrawMoneyRef.current!.value) })
        withdrawMoneyRef.current!.value = '0'
        break
    }
  }

  return (
    <>
      <div className='flex flex-col'>
        <Text dangerouslySetInnerHTML={{ __html: bankShowQuery.data?.text.header ?? 'bank_header' }} />
        <Text
          dangerouslySetInnerHTML={{ __html: bankShowQuery.data?.text.description ?? 'bank_description' }}
          small
          italic
        />
      </div>

      {message && (
        <Alert>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      )}

      <div className='flex gap-4 overflow-auto'>
        <Card.Inner className='justify-between'>
          <H3 className='whitespace-nowrap'>{bankShowQuery.data?.text.depositedMoney ?? 'bank_deposited_money'}</H3>
          <Text>{bankShowAccountQuery.data?.money ?? 0}</Text>
        </Card.Inner>

        <Card.Inner>
          <H3>{bankShowQuery.data?.text.depositMoney ?? 'bank_deposit_money'}</H3>
          <div className='flex space-x-2'>
            <Input ref={depositMoneyRef} type='number' defaultValue={0} />
            <Button variant='destructive' onClick={() => handleMoneyAction('deposit')}>
              {commonShowQuery.data?.text.deposit ?? 'bank_deposit'}
            </Button>
          </div>
        </Card.Inner>

        <Card.Inner>
          <H3>{bankShowQuery.data?.text.withdrawMoney ?? 'bank_withdraw_money'}</H3>
          <div className='flex space-x-2'>
            <Input ref={withdrawMoneyRef} type='number' defaultValue={0} />
            <Button variant='destructive' onClick={() => handleMoneyAction('withdraw')}>
              {commonShowQuery.data?.text.withdraw ?? 'bank_withdraw'}
            </Button>
          </div>
        </Card.Inner>
      </div>

      <Card.Inner>
        <H3>{bankShowQuery.data?.text.depositWeapon ?? 'bank_deposit_weapon'}</H3>
        <WeaponSafe bankId={bankId} action='deposit' onAction={handleAction('weapon')} />
      </Card.Inner>

      <Card.Inner>
        <H3>{bankShowQuery.data?.text.depositArmor ?? 'bank_deposit_armor'}</H3>
        <ArmorSafe bankId={bankId} action='deposit' onAction={handleAction('armor')} />
      </Card.Inner>

      <Card.Inner>
        <H3>{bankShowQuery.data?.text.depositPotion ?? 'bank_deposit_potion'}</H3>
        <PotionSafe bankId={bankId} action='deposit' onAction={handleAction('potion')} />
      </Card.Inner>

      <Card.Inner>
        <H3>{bankShowQuery.data?.text.withdrawWeapon ?? 'bank_withdraw_weapon'}</H3>
        <WeaponSafe bankId={bankId} action='withdraw' onAction={handleAction('weapon')} />
      </Card.Inner>

      <Card.Inner>
        <H3>{bankShowQuery.data?.text.withdrawArmor ?? 'bank_withdraw_armor'}</H3>
        <ArmorSafe bankId={bankId} action='withdraw' onAction={handleAction('armor')} />
      </Card.Inner>
      
      <Card.Inner>
        <H3>{bankShowQuery.data?.text.withdrawPotion ?? 'bank_withdraw_potion'}</H3>
        <PotionSafe bankId={bankId} action='withdraw' onAction={handleAction('potion')} />
      </Card.Inner>
    </>
  )
}
