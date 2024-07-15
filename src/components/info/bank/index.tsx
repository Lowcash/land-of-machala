import React from 'react'
import { api } from '@/trpc/react'

import * as S from './index.styles'
import { H3, Text } from '@/styles/text'
import { Loading } from '../../loading'
import { Alert } from '../../alert'
import { Button } from '@/components/ui/button'
import { ArmorSafe, PotionSafe, WeaponSafe } from './safe'
import type { Action, ArmorItem, PotionItem, WeaponItem } from './safe'

type Props = {
  id: string
}

export function Bank(p: Props) {
  const [showInfo, setShowInfo] = React.useState<Action | undefined>(undefined)

  const { player, bank, inventory } = api.useUtils()
  const showBank = api.bank.show.useQuery({ bankId: p.id })
  const showAccount = api.bank.showAccount.useQuery({ bankId: p.id })
  const showInventory = api.inventory.show.useQuery()
  const deposit = api.bank.deposit.useMutation({
    onSettled: () => {
      player.info.invalidate()
      player.stats.invalidate()
      player.wearable.invalidate()
      bank.showAccount.invalidate()
      inventory.show.invalidate()
      setShowInfo('deposit')
    },
  })
  const withdraw = api.bank.withdraw.useMutation({
    onSettled: () => {
      player.info.invalidate()
      bank.showAccount.invalidate()
      inventory.show.invalidate()
      setShowInfo('withdraw')
    },
  })

  const handleItemAction = React.useCallback(
    (action: Action, item: WeaponItem | ArmorItem | PotionItem, type: 'weapon' | 'armor' | 'potion') => {
      switch (action) {
        case 'deposit':
          deposit.mutate({ bankId: p.id, item: { id: item.refItemId, type } })
          break
        case 'withdraw':
          withdraw.mutate({ bankId: p.id, item: { id: item.refItemId, type } })
          break
      }
    },
    [p.id, deposit, withdraw],
  )

  const handleMoneyAction = React.useCallback(
    (action: Action) => {
      switch (action) {
        case 'deposit':
          if (!depositMoneyRef.current?.value === undefined) return

          deposit.mutate({ bankId: p.id, money: Number(depositMoneyRef.current!.value) })
          depositMoneyRef.current!.value = '0'
          break
        case 'withdraw':
          if (!withdrawMoneyRef.current?.value === undefined) return

          withdraw.mutate({ bankId: p.id, money: Number(withdrawMoneyRef.current!.value) })
          withdrawMoneyRef.current!.value = '0'
          break
      }
    },
    [p.id, deposit, withdraw],
  )

  const depositMoneyRef = React.useRef<React.ElementRef<'input'>>(null)
  const withdrawMoneyRef = React.useRef<React.ElementRef<'input'>>(null)

  const depositWeapons = React.useMemo(
    () => showInventory.data?.weapons?.map((x) => ({ ...x.weapon, refItemId: x.id })),
    [showInventory.data?.weapons],
  )
  const depositArmors = React.useMemo(
    () => showInventory.data?.armors?.map((x) => ({ ...x.armor, refItemId: x.id })),
    [showInventory.data?.armors],
  )
  const depositPotions = React.useMemo(
    () => showInventory.data?.potions?.map((x) => ({ ...x.potion, refItemId: x.id })),
    [showInventory.data?.potions],
  )
  const withdrawWeapons = React.useMemo(
    () => showAccount.data?.weapons?.map((x) => ({ ...x.weapon, refItemId: x.id })),
    [showAccount.data?.weapons],
  )
  const withdrawArmors = React.useMemo(
    () => showAccount.data?.armors?.map((x) => ({ ...x.armor, refItemId: x.id })),
    [showAccount.data?.armors],
  )
  const withdrawPotions = React.useMemo(
    () => showAccount.data?.potions?.map((x) => ({ ...x.potion, refItemId: x.id })),
    [showAccount.data?.potions],
  )

  if (showBank.isLoading) return <Loading />
  if (!showBank.data) return <></>

  const hasDepositWeapons = (depositWeapons?.length ?? 0) > 0
  const hasDepositArmors = (depositArmors?.length ?? 0) > 0
  const hasDepositPotions = (depositPotions?.length ?? 0) > 0
  const hasWithdrawWeapons = (withdrawWeapons?.length ?? 0) > 0
  const hasWithdrawArmors = (withdrawArmors?.length ?? 0) > 0
  const hasWithdrawPotions = (withdrawPotions?.length ?? 0) > 0

  return (
    <>
      <Text>
        Nacházíš se v <b>{showBank.data.name}</b>
      </Text>
      <br />
      <Text>{showBank.data.description}</Text>
      <br />
      <br />
      <Text>{showBank.data.subdescription}</Text>
      <br />
      <br />
      {showInfo === 'deposit' && deposit.data?.success !== undefined && (
        <Alert>{deposit.data.success ? 'Zboží uloženo v bance' : 'Nějak se nám to zkomplikovalo?!'}</Alert>
      )}
      {showInfo === 'withdraw' && withdraw.data?.success !== undefined && (
        <Alert>{withdraw.data.success ? 'Zboží vybráno z banky' : 'Nějak se nám to zkomplikovalo?!'}</Alert>
      )}
      <br />
      <br />
      <div className='flex justify-between space-x-4'>
        <div>
          <H3 className='whitespace-nowrap'>Uloženo peněz</H3>
          <Text>{showAccount.data?.money ?? 0}</Text>
        </div>
        <div className='flex space-x-6'>
          <div>
            <H3>Uložit Peníze</H3>
            <div className='flex space-x-2'>
              <S.Input ref={depositMoneyRef} type='number' defaultValue={0} />
              <Button variant='destructive' onClick={() => handleMoneyAction('deposit')}>
                Uložit
              </Button>
            </div>
          </div>
          <div>
            <H3>Vybrat Peníze</H3>
            <div className='flex space-x-2'>
              <S.Input ref={withdrawMoneyRef} type='number' defaultValue={0} />
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
          <WeaponSafe
            weapons={depositWeapons!}
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
          <ArmorSafe
            armors={depositArmors!}
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
          <PotionSafe
            potions={depositPotions!}
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
          <WeaponSafe
            weapons={withdrawWeapons!}
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
          <ArmorSafe
            armors={withdrawArmors!}
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
          <PotionSafe
            potions={withdrawPotions!}
            action='withdraw'
            onAction={(action, item) => handleItemAction(action, item, 'potion')}
          />
        </>
      )}
    </>
  )
}
