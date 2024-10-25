'use client'

import React from 'react'
import { useInfoQuery } from '@/hooks/api/useGame'
import { useBankQuery, useBankAccountQuery, useDepositItemMutation, useWithdrawItemMutation } from '@/hooks/api/useBank'
import { useShowInventoryQuery } from '@/hooks/api/useInventory'

import { ArmorSafe, PotionSafe, WeaponSafe, type OnActionParams } from './Safe'
import { H3, Input, Text } from '@/styles/text-server'
import { Button } from '@/components/ui/button'
import Loading from '@/components/loading'
import Alert from '@/components/alert'

export default function Bank() {
  const infoQuery = useInfoQuery()

  // @ts-ignore
  const bankId = infoQuery.data?.place?.bank.id

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
        Nacházíš se v <b>{bankQuery.data?.name}</b>
      </Text>
      <br />
      <Text>{bankQuery.data?.description}</Text>
      <br />
      <Text>{bankQuery.data?.subdescription}</Text>

      {hasMessage && (
        <>
          <br />
          <Alert>
            {(depositItemMutation.isError || withdrawItemMutation.isError) && 'Nějak se nám to zkomplikovalo?!'}

            {depositItemMutation.isSuccess && 'Zboží uloženo v bance'}
            {withdrawItemMutation.isSuccess && 'Zboží vybráno z banky'}
          </Alert>
        </>
      )}

      <br />
      <br />
      <div className='flex justify-between space-x-4'>
        <div>
          <H3 className='whitespace-nowrap'>Uloženo peněz</H3>
          <br />
          <Text>{bankAccountQuery.data?.money ?? 0}</Text>
        </div>
        <div className='flex space-x-6'>
          <div>
            <H3>Uložit Peníze</H3>
            <br />
            <div className='flex space-x-2'>
              <Input ref={depositMoneyRef} type='number' defaultValue={0} />
              <Button variant='destructive' onClick={() => handleMoneyAction('deposit')}>
                Uložit
              </Button>
            </div>
          </div>
          <div>
            <H3>Vybrat Peníze</H3>
            <br />
            <div className='flex space-x-2'>
              <Input ref={withdrawMoneyRef} type='number' defaultValue={0} />
              <Button variant='destructive' onClick={() => handleMoneyAction('withdraw')}>
                Vybrat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {hasDepositWeapons && (
        <>
          <br />
          <br />
          <H3>Uložit Zbraň</H3>
          <br />
          <WeaponSafe
            items={depositWeapons!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'weapon')}
          />
        </>
      )}

      {hasDepositArmors && (
        <>
          <br />
          <br />
          <H3>Uložit Zbroj</H3>
          <br />
          <ArmorSafe
            items={depositArmors!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'armor')}
          />
        </>
      )}

      {hasDepositPotions && (
        <>
          <br />
          <br />
          <H3>Uložit Potion</H3>
          <br />
          <PotionSafe
            items={depositPotions!}
            action='deposit'
            onAction={(action, item) => handleItemAction(action, item, 'potion')}
          />
        </>
      )}

      {hasWithdrawWeapons && (
        <>
          <br />
          <br />
          <H3>Vybrat Zbraň</H3>
          <br />
          <WeaponSafe
            items={withdrawWeapons!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'weapon')}
          />
        </>
      )}

      {hasWithdrawArmors && (
        <>
          <br />
          <br />
          <H3>Vybrat Zbroj</H3>
          <br />
          <ArmorSafe
            items={withdrawArmors!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'armor')}
          />
        </>
      )}

      {hasWithdrawPotions && (
        <>
          <br />
          <br />
          <H3>Vybrat Potion</H3>
          <br />
          <PotionSafe
            items={withdrawPotions!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'potion')}
          />
        </>
      )}
    </>
  )
}
