'use client'

import { depositGoldAction, withdrawGoldAction } from '@/lib/actions/bank'
import { useServerAction } from '@/lib/hooks/ui/useServerAction'

interface UseBankActionsProps {
  onSuccess?: () => void
}

export function useBankActions({ onSuccess }: UseBankActionsProps = {}) {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  const handleDeposit = (amount: number) => {
    execute(async () => {
      const result = await depositGoldAction({ amount })
      if (result[0]?.success && onSuccess) {
        onSuccess()
      }
      return result
    })
  }

  const handleWithdraw = (amount: number) => {
    execute(async () => {
      const result = await withdrawGoldAction({ amount })
      if (result[0]?.success && onSuccess) {
        onSuccess()
      }
      return result
    })
  }

  return {
    handleDeposit,
    handleWithdraw,
    isPending,
  }
}
