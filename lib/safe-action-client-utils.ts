import type { inferServerActionReturnType } from 'zsa'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isActionSuccessful = <T>(action?: any): action is [T, null] => {
  if (!action) return false
  if (!Array.isArray(action)) return false
  if (action[1] !== null) return false

  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveActionResult = async <T>(action: Promise<any>): Promise<T> => {
  return new Promise((resolve, reject) => {
    action
      .then((result) => {
        if (isActionSuccessful(result)) {
          resolve(result[0] as T)
        } else {
          reject(result[1]?.message ?? 'Something went wrong')
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic type utility for inferring server action return types
export type SafeActionResultData<T extends (...args: any) => any> = inferServerActionReturnType<T>[0]
