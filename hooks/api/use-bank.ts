import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import { show, showAccount, depositItem, withdrawItem } from '@/app/actions/bank'

import { QUERY_KEY } from '@/config'

export const useBankShowQuery = createQueryHook([QUERY_KEY.BANK], show)

export type BankAccountItem = NonNullable<ReturnType<typeof _useBankShowAccountQuery>['data']>[
  | 'armors'
  | 'weapons'
  | 'potions'][0]

const _useBankShowAccountQuery = createQueryHook([QUERY_KEY.BANK_ACCOUNT], showAccount)

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

export const useBankDepositItemMutation = createMutationHook(depositItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
export const useBankWithdrawItemMutation = createMutationHook(withdrawItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
