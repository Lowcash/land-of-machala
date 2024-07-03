import React from 'react'
import { api } from '@/trpc/react'

import { Text } from '@/styles/text'
import { Loading } from '../../loading'
import { Alert } from '../../alert'
import { ArmorSafe, WeaponSafe } from './safe'
import type { Action, ArmorItem, WeaponItem } from './safe'

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

  const handleWeaponAction = React.useCallback(
    (action: Action, weapon: WeaponItem) => {
      switch (action) {
        case 'deposit':
          deposit.mutate({ bankId: p.id, inventoryItemId: weapon.refItemId, itemType: 'weapon' })
          break
        case 'withdraw':
          withdraw.mutate({ bankId: p.id, bankItemId: weapon.refItemId, itemType: 'weapon' })
          break
      }
    },
    [p.id, deposit, withdraw],
  )

  const handleArmorAction = React.useCallback(
    (action: Action, armor: ArmorItem) => {
      switch (action) {
        case 'deposit':
          deposit.mutate({ bankId: p.id, inventoryItemId: armor.refItemId, itemType: 'armor' })
          break
        case 'withdraw':
          withdraw.mutate({ bankId: p.id, bankItemId: armor.refItemId, itemType: 'armor' })
          break
      }
    },
    [p.id, deposit, withdraw],
  )

  const depositWeapons = React.useMemo(
    () => showInventory.data?.weapons?.map((x) => ({ ...x.weapon, refItemId: x.id })),
    [showInventory.data?.weapons],
  )
  const depositArmors = React.useMemo(
    () => showInventory.data?.armors?.map((x) => ({ ...x.armor, refItemId: x.id })),
    [showInventory.data?.armors],
  )
  const withdrawWeapons = React.useMemo(
    () => showAccount.data?.weapons?.map((x) => ({ ...x.weapon, refItemId: x.id })),
    [showAccount.data?.weapons],
  )
  const withdrawArmors = React.useMemo(
    () => showAccount.data?.armors?.map((x) => ({ ...x.armor, refItemId: x.id })),
    [showAccount.data?.armors],
  )

  if (showBank.isLoading) return <Loading />
  if (!showBank.data) return <></>

  const hasDepositWeapons = (depositWeapons?.length ?? 0) > 0
  const hasDepositArmors = (depositArmors?.length ?? 0) > 0
  const hasWithdrawWeapons = (withdrawWeapons?.length ?? 0) > 0
  const hasWithdrawArmors = (withdrawArmors?.length ?? 0) > 0

  return (
    <>
      Nacházíš se v <b>{showBank.data.name}</b>
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
      {hasDepositWeapons && (
        <>
          <br />
          <br />
          <Text>Uložit Zbraň</Text>
          <br />
          <WeaponSafe weapons={depositWeapons!} action='deposit' onAction={handleWeaponAction} />
        </>
      )}
      {hasDepositArmors && (
        <>
          <br />
          <br />
          <Text>Uložit Zbroj</Text>
          <br />
          <ArmorSafe armors={depositArmors!} action='deposit' onAction={handleArmorAction} />
        </>
      )}
      {hasWithdrawWeapons && (
        <>
          <br />
          <br />
          <Text>Vybrat Zbraň</Text>
          <br />
          <WeaponSafe weapons={withdrawWeapons!} action='withdraw' onAction={handleWeaponAction} />
        </>
      )}
      {hasWithdrawArmors && (
        <>
          <br />
          <br />
          <Text>Vybrat Zbroj</Text>
          <br />
          <ArmorSafe armors={withdrawArmors!} action='withdraw' onAction={handleArmorAction} />
        </>
      )}
    </>
  )
}
