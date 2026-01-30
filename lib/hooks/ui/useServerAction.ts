'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

/**
 * Options for server action execution
 */
interface ServerActionOptions<T = unknown> {
  /** Success message to show (optional - can be handled by action itself) */
  successMessage?: string
  /** Custom error message (optional - defaults to action error) */
  errorMessage?: string
  /** Whether to refresh the router after success */
  shouldRefresh?: boolean
  /** Custom success handler */
  onSuccess?: (data: T) => void
  /** Custom error handler */
  onError?: (error: string) => void
}

/**
 * Result from server action execution
 */
interface ServerActionResult<T = unknown> {
  success: boolean
  message?: string
  error?: string
  data?: T
}

/**
 * Hook return value
 */
interface UseServerActionReturn {
  /** Execute server action with consistent error handling */
  execute: <T = unknown>(
    action: () => Promise<readonly [ServerActionResult<T> | null, Error | null]>
  ) => Promise<void>
  /** Pending state for transitions */
  isPending: boolean
}

/**
 * Unified hook for server action execution with consistent error handling
 *
 * Addresses the "nelícující kód" issue by providing a single consistent pattern
 * for all server actions instead of repetitive hook declarations.
 *
 * @example
 * ```tsx
 * const { execute, isPending } = useServerAction({
 *   successMessage: 'Položka koupena!',
 *   shouldRefresh: true,
 * })
 *
 * const handlePurchase = () => {
 *   execute(() => purchaseItem(itemId))
 * }
 * ```
 */
export function useServerAction<T = unknown>(
  options: ServerActionOptions<T> = {}
): UseServerActionReturn {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const execute = async <TResult = T>(
    action: () => Promise<readonly [ServerActionResult<TResult> | null, Error | null]>
  ) => {
    startTransition(async () => {
      try {
        const [data, err] = await action()

        // Handle error from action wrapper
        if (err) {
          const errorMsg = options.errorMessage || err.message
          toast.error(errorMsg)
          options.onError?.(err.message)
          return
        }

        // Handle success/error from action result
        if (data?.success) {
          if (options.successMessage || data.message) {
            toast.success(options.successMessage || data.message!)
          }
          if (options.onSuccess && data.data !== undefined) {
            options.onSuccess(data.data as T)
          }
          if (options.shouldRefresh) {
            router.refresh()
          }
        } else {
          const errorMsg = options.errorMessage || data?.error || 'Něco se pokazilo'
          toast.error(errorMsg)
          options.onError?.(data?.error || 'Unknown error')
        }
      } catch (error) {
        const errorMsg = options.errorMessage || 'Neočekávaná chyba'
        toast.error(errorMsg)
        options.onError?.(error instanceof Error ? error.message : 'Unknown error')
      }
    })
  }

  return { execute, isPending }
}
