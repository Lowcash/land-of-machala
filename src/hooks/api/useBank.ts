import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as BankAction from '@/server/actions/bank'

import { QUERY_KEY } from '@/const'

export const useBankQuery = createQueryHook([QUERY_KEY.BANK], BankAction.show)
export const useBankAccountQuery = createQueryHook([QUERY_KEY.BANK_ACCOUNT], BankAction.showAccount)

export const useDepositItemMutation = createMutationHook(BankAction.depositItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
export const useWithdrawItemMutation = createMutationHook(BankAction.withdrawItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
