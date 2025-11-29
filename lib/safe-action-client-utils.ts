import type { inferServerActionReturnType } from 'zsa'

const isActionSuccessful = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic safe action result requires any for flexibility
  action?: any,
): action is [T, null] => {
  if (!action) return false
  if (!Array.isArray(action)) return false
  if (action[1] !== null) return false

  return true
}

export const resolveActionResult = async <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic action result requires any for flexibility
  action: Promise<any>,
): Promise<T> => {
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- Generic function type required for type inference
export type SafeActionResultData<T extends (...args: any) => any> = inferServerActionReturnType<T>[0]
