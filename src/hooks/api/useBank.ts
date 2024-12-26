import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { depositItem, withdrawItem, show, showAccount } from '@/server/actions/bank'

import { QUERY_KEY } from '@/const'

export const useBankQuery = createQueryHook([QUERY_KEY.BANK], show)
export const useBankAccountQuery = createQueryHook([QUERY_KEY.BANK_ACCOUNT], showAccount)

export const useDepositItemMutation = createMutationHook(depositItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
export const useWithdrawItemMutation = createMutationHook(withdrawItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
