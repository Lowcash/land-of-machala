import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as BankAction from '@/app/actions/bank'

import { QUERY_KEY } from '@/config'

export const useBankShowQuery = createQueryHook([QUERY_KEY.BANK], BankAction.show)

export type BankAccountItem = NonNullable<ReturnType<typeof _useBankShowAccountQuery>['data']>[
  | 'armors'
  | 'weapons'
  | 'potions'][0]

const _useBankShowAccountQuery = createQueryHook([QUERY_KEY.BANK_ACCOUNT], BankAction.showAccount)

export function useBankShowAccountQuery(...p: Parameters<typeof _useBankShowAccountQuery>) {
  const bankShowAccountQuery = _useBankShowAccountQuery(...p)

  return {
    ...bankShowAccountQuery,
    derived: {
      hasWithdrawArmors: !!bankShowAccountQuery.data?.armors.length,
      hasWithdrawWeapons: !!bankShowAccountQuery.data?.weapons.length,
      hasWithdrawPotions: !!bankShowAccountQuery.data?.potions.length,
    },
  }
}

export const useBankDepositItemMutation = createMutationHook(BankAction.depositItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
export const useBankWithdrawItemMutation = createMutationHook(BankAction.withdrawItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
