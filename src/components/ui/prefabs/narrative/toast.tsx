'use client'

import * as React from 'react'
import { useNotification } from '@/providers/notification-provider'

/**
 * Heraldic Toast prefab.
 * Provides a highly semantic API for showing game events.
 */
export const useHeraldicToast = () => {
  const { notify, success, error, warn, info } = useNotification()

  /** Proclaim a royal decree or major world event */
  const proclaim = React.useCallback((message: string, title: string = 'Royal Decree') => {
    return notify({
      title,
      message,
      variant: 'ornamental',
      duration: 10000
    })
  }, [notify])

  /** Announce a player discovery (e.g. recipe, location) */
  const announceDiscovery = React.useCallback((name: string) => {
    return success(`${name} has been added to your collection.`, 'New Discovery')
  }, [success])

  /** Warn about dangerous environments or debuffs */
  const threaten = React.useCallback((curse: string) => {
    return warn(curse, 'Dark Omen')
  }, [warn])

  /** Report a battle casualty or major failure */
  const reportDefeat = React.useCallback((reason: string) => {
    return error(reason, 'Defeat')
  }, [error])

  return {
    proclaim,
    announceDiscovery,
    threaten,
    reportDefeat,
    // Pass through base methods
    success,
    error,
    warn,
    info,
    notify
  }
}
