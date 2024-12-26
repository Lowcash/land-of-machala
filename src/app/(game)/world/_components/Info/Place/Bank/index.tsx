'use client'

import React from 'react'
import { loc } from '@/local'
import { useInfoQuery } from '@/hooks/api/useGame'
import { useBankQuery, useBankAccountQuery, useDepositItemMutation, useWithdrawItemMutation } from '@/hooks/api/useBank'
import { useShowInventoryQuery } from '@/hooks/api/useInventory'

import { ArmorSafe, PotionSafe, WeaponSafe, type OnActionParams } from './Safe'
import { H3, Input, Text } from '@/styles/text-server'
import { Card } from '@/styles/common-server'
import { Button } from '@/components/ui/button'
import Loading from '@/components/loading'
import Alert from '@/components/alert'

export default function Bank() {
  const infoQuery = useInfoQuery()

  const bankId = infoQuery.data?.place?.bank?.id!

  const bankQuery = useBankQuery({ bankId })
  const bankAccountQuery = useBankAccountQuery({ bankId })
  const showInventoryQuery = useShowInventoryQuery()

  const depositItemMutation = useDepositItemMutation()
  const withdrawItemMutation = useWithdrawItemMutation()

  const depositMoneyRef = React.useRef<React.ElementRef<'input'>>(null)
  const withdrawMoneyRef = React.useRef<React.ElementRef<'input'>>(null)

  const handleItemAction = React.useCallback(
    <T extends any>(...onActionArgs: OnActionParams<T>) => {
      const [action, item, type] = onActionArgs

      switch (action) {
        case 'deposit':
          depositItemMutation.mutate({ bankId, item: { id: item.safeItemId, type } })
          break
        case 'withdraw':
          withdrawItemMutation.mutate({ bankId, item: { id: item.safeItemId, type } })
          break
      }
    },
    [bankId, depositItemMutation, withdrawItemMutation],
  )

  const handleMoneyAction = React.useCallback(
    (action: 'deposit' | 'withdraw') => {
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
    },
    [bankId, depositItemMutation, withdrawItemMutation],
  )

  const depositWeapons = React.useMemo(
    () => showInventoryQuery.data?.weapons?.map((x) => ({ ...x.weapon, safeItemId: x.id })),
    [showInventoryQuery.data?.weapons],
  )
  const depositArmors = React.useMemo(
    () => showInventoryQuery.data?.armors?.map((x) => ({ ...x.armor, safeItemId: x.id })),
    [showInventoryQuery.data?.armors],
  )
  const depositPotions = React.useMemo(
    () => bankAccountQuery.data?.potions?.map((x) => ({ ...x.potion, safeItemId: x.id })),
    [bankAccountQuery.data?.potions],
  )
  const withdrawWeapons = React.useMemo(
    () => bankAccountQuery.data?.weapons?.map((x) => ({ ...x.weapon, safeItemId: x.id })),
    [bankAccountQuery.data?.weapons],
  )
  const withdrawArmors = React.useMemo(
    () => bankAccountQuery.data?.armors?.map((x) => ({ ...x.armor, safeItemId: x.id })),
    [bankAccountQuery.data?.armors],
  )
  const withdrawPotions = React.useMemo(
    () => bankAccountQuery.data?.potions?.map((x) => ({ ...x.potion, safeItemId: x.id })),
    [bankAccountQuery.data?.potions],
  )

  if (bankQuery.isLoading) return <Loading />

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
        {loc.place.your_are_in} <b>{bankQuery.data?.name}</b>
      </Text>
      <Text>{bankQuery.data?.description}</Text>
      <Text>{bankQuery.data?.subdescription}</Text>

      {hasMessage && (
        <Alert>
          {(depositItemMutation.isError || withdrawItemMutation.isError) && loc.place.bank.deposit_or_withdraw_failed}

          {depositItemMutation.isSuccess && loc.place.bank.deposit_success}
          {withdrawItemMutation.isSuccess && loc.place.bank.withdraw_success}
        </Alert>
      )}

      <div className='flex gap-4 overflow-auto'>
        <Card.Inner className='justify-between'>
          <H3 className='whitespace-nowrap'>{loc.place.bank.deposited_money}</H3>
          <Text>{bankAccountQuery.data?.money ?? 0}</Text>
        </Card.Inner>

        <Card.Inner>
          <H3>{loc.place.bank.deposit_money}</H3>
          <div className='flex space-x-2'>
            <Input ref={depositMoneyRef} type='number' defaultValue={0} />
            <Button variant='destructive' onClick={() => handleMoneyAction('deposit')}>
              {loc.place.bank.deposit}
            </Button>
          </div>
        </Card.Inner>

        <Card.Inner>
          <H3>{loc.place.bank.withdraw_money}</H3>
          <div className='flex space-x-2'>
            <Input ref={withdrawMoneyRef} type='number' defaultValue={0} />
            <Button variant='destructive' onClick={() => handleMoneyAction('withdraw')}>
              {loc.place.bank.withdraw}
            </Button>
          </div>
        </Card.Inner>
      </div>

      {hasDepositWeapons && (
        <Card.Inner>
          <H3>{loc.place.bank.deposit_weapon}</H3>
          <WeaponSafe
            items={depositWeapons!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'weapon')}
          />
        </Card.Inner>
      )}

      {hasDepositArmors && (
        <Card.Inner>
          <H3>{loc.place.bank.deposit_armor}</H3>
          <ArmorSafe
            items={depositArmors!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'armor')}
          />
        </Card.Inner>
      )}

      {hasDepositPotions && (
        <Card.Inner>
          <H3>{loc.place.bank.deposit_potion}</H3>
          <PotionSafe
            items={depositPotions!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'potion')}
          />
        </Card.Inner>
      )}

      {hasWithdrawWeapons && (
        <Card.Inner>
          <H3>{loc.place.bank.withdraw_weapon}</H3>
          <WeaponSafe
            items={withdrawWeapons!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'weapon')}
          />
        </Card.Inner>
      )}

      {hasWithdrawArmors && (
        <Card.Inner>
          <H3>{loc.place.bank.withdraw_armor}</H3>
          <ArmorSafe
            items={withdrawArmors!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'armor')}
          />
        </Card.Inner>
      )}

      {hasWithdrawPotions && (
        <Card.Inner>
          <H3>{loc.place.bank.withdraw_potion}</H3>
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
