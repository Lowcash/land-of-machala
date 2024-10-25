import { createMutationHook, createQueryHook } from '@/app/api/_api-hooks'
import { depositItem, withdrawItem, showBank, showBankAccount } from '@/server/actions/bank'

import { QUERY_KEY } from '@/const'

export const useBankQuery = createQueryHook([QUERY_KEY.BANK], showBank)
export const useBankAccountQuery = createQueryHook([QUERY_KEY.BANK_ACCOUNT], showBankAccount)

export const useDepositItemMutation = createMutationHook(depositItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.PLAYER_STATS,
  QUERY_KEY.WEARABLE,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
export const useWithdrawItemMutation = createMutationHook(withdrawItem, [
  QUERY_KEY.PLAYER,
  QUERY_KEY.BANK_ACCOUNT,
  QUERY_KEY.INVENTORY,
])
