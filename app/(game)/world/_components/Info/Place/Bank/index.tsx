'use client'

import React from 'react'
import i18n from '@/lib/i18n'
import {
  useBankQuery,
  useBankAccountQuery,
  useBankDepositItemMutation,
  useBankWithdrawItemMutation,
} from '@/hooks/api/use-bank'
import { useInventoryShowQuery } from '@/hooks/api/use-inventory'

import { ArmorSafe, PotionSafe, WeaponSafe, type OnActionParams } from './Safe'
import { H3, Input, Text } from '@/styles/typography'
import { Card } from '@/styles/common'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Loading'
import Alert from '@/components/Alert'

interface Props {
  bankId: string
}

export default function Bank({ bankId }: Props) {
  const bankQuery = useBankQuery({ bankId })
  const bankAccountQuery = useBankAccountQuery({ bankId })
  const showInventoryQuery = useInventoryShowQuery()

  const depositItemMutation = useBankDepositItemMutation()
  const withdrawItemMutation = useBankWithdrawItemMutation()

  const depositMoneyRef = React.useRef<React.ElementRef<'input'>>(null)
  const withdrawMoneyRef = React.useRef<React.ElementRef<'input'>>(null)

  const handleItemAction = <T extends any>(...onActionArgs: OnActionParams<T>) => {
    const [action, item, type] = onActionArgs

    switch (action) {
      case 'deposit':
        depositItemMutation.mutate({ bankId, item: { id: item.safeItemId, type } })
        break
      case 'withdraw':
        withdrawItemMutation.mutate({ bankId, item: { id: item.safeItemId, type } })
        break
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

  const depositWeapons = showInventoryQuery.data?.weapons?.map((x) => ({ ...x.weapon, safeItemId: x.id }))
  const depositArmors = showInventoryQuery.data?.armors?.map((x) => ({ ...x.armor, safeItemId: x.id }))
  const depositPotions = bankAccountQuery.data?.potions?.map((x) => ({ ...x.potion, safeItemId: x.id }))
  const withdrawWeapons = bankAccountQuery.data?.weapons?.map((x) => ({ ...x.weapon, safeItemId: x.id }))
  const withdrawArmors = bankAccountQuery.data?.armors?.map((x) => ({ ...x.armor, safeItemId: x.id }))
  const withdrawPotions = bankAccountQuery.data?.potions?.map((x) => ({ ...x.potion, safeItemId: x.id }))

  if (bankQuery.isLoading) return <Loading position='local' />

  const hasDepositWeapons = (depositWeapons?.length ?? 0) > 0
  const hasDepositArmors = (depositArmors?.length ?? 0) > 0
  const hasDepositPotions = (depositPotions?.length ?? 0) > 0
  const hasWithdrawWeapons = (withdrawWeapons?.length ?? 0) > 0
  const hasWithdrawArmors = (withdrawArmors?.length ?? 0) > 0
  const hasWithdrawPotions = (withdrawPotions?.length ?? 0) > 0

  const hasMessage = !depositItemMutation.isIdle || !withdrawItemMutation.isIdle

  return (
    <>
      <Text>
        {i18n.t('place.your_are_in')} <b>{bankQuery.data?.i18n_key}</b>
      </Text>
      {/* <Text>{bankQuery.data?.description}</Text> */}

      {hasMessage && (
        <Alert>
          {(depositItemMutation.isError || withdrawItemMutation.isError) &&
            i18n.t('place.main_city_bank.deposit_or_withdraw_failed')}

          {depositItemMutation.isSuccess && i18n.t('place.main_city_bank.deposit_success')}
          {withdrawItemMutation.isSuccess && i18n.t('place.main_city_bank.withdraw_success')}
        </Alert>
      )}

      <div className='flex gap-4 overflow-auto'>
        <Card.Inner className='justify-between'>
          <H3 className='whitespace-nowrap'>{i18n.t('place.main_city_bank.deposited_money')}</H3>
          <Text>{bankAccountQuery.data?.money ?? 0}</Text>
        </Card.Inner>

        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.deposit_money')}</H3>
          <div className='flex space-x-2'>
            <Input ref={depositMoneyRef} type='number' defaultValue={0} />
            <Button variant='destructive' onClick={() => handleMoneyAction('deposit')}>
              {i18n.t('place.main_city_bank.deposit')}
            </Button>
          </div>
        </Card.Inner>

        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.withdraw_money')}</H3>
          <div className='flex space-x-2'>
            <Input ref={withdrawMoneyRef} type='number' defaultValue={0} />
            <Button variant='destructive' onClick={() => handleMoneyAction('withdraw')}>
              {i18n.t('place.main_city_bank.withdraw')}
            </Button>
          </div>
        </Card.Inner>
      </div>

      {hasDepositWeapons && (
        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.deposit_weapon')}</H3>
          <WeaponSafe
            items={depositWeapons!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'weapon')}
          />
        </Card.Inner>
      )}

      {hasDepositArmors && (
        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.deposit_armor')}</H3>
          <ArmorSafe
            items={depositArmors!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'armor')}
          />
        </Card.Inner>
      )}

      {hasDepositPotions && (
        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.deposit_potion')}</H3>
          <PotionSafe
            items={depositPotions!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'potion')}
          />
        </Card.Inner>
      )}

      {hasWithdrawWeapons && (
        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.withdraw_weapon')}</H3>
          <WeaponSafe
            items={withdrawWeapons!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'weapon')}
          />
        </Card.Inner>
      )}

      {hasWithdrawArmors && (
        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.withdraw_armor')}</H3>
          <ArmorSafe
            items={withdrawArmors!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'armor')}
          />
        </Card.Inner>
      )}

      {hasWithdrawPotions && (
        <Card.Inner>
          <H3>{i18n.t('place.main_city_bank.withdraw_potion')}</H3>
          <PotionSafe
            items={withdrawPotions!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'potion')}
          />
        </Card.Inner>
      )}
    </>
  )
}
