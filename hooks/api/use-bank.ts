import { createMutationHook, createQueryHook } from '@/hooks/api/_api-hooks'

import * as BankAction from '@/app/actions/bank'

import { QUERY_KEY } from '@/config'

export const useBankShowQuery = createQueryHook([QUERY_KEY.BANK], BankAction.show)
export const useBankAccountQuery = createQueryHook([QUERY_KEY.BANK_ACCOUNT], BankAction.showAccount)

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
