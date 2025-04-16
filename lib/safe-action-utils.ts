import { z } from 'zod'
import type { InferSafeActionFnResult, SafeActionResult } from 'next-safe-action'

export const isActionSuccessful = <T extends z.ZodType>(
  action?: SafeActionResult<string, T, readonly [], any, any>,
): action is { data: T; serverError: undefined; validationError: undefined } => {
  if (!action) return false
  if (action.serverError) return false
  if (action.validationErrors) return false
  if (action.bindArgsValidationErrors) return false

  return true
}

export const resolveActionResult = async <T extends z.ZodType>(
  action: Promise<SafeActionResult<string, T, readonly [], any, any> | undefined>,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    action
      .then((result) => {
        if (isActionSuccessful(result)) {
          resolve(result.data)
        } else {
          reject(
            result?.serverError ??
              result?.validationErrors ??
              result?.bindArgsValidationErrors ??
              'Something went wrong',
          )
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export type SafeActionResultData<T extends Function> = InferSafeActionFnResult<T>['data']
