'use client'

import { useCallback, useState } from 'react'

interface Buff {
  id: string
  [key: string]: unknown
}

/**
 * Hook for managing active buffs/debuffs
 */
export function useBuffs(initialBuffs: Buff[] = []) {
  const [activeBuffs, setActiveBuffs] = useState<Buff[]>(initialBuffs)

  const addBuff = useCallback((buff: Buff) => {
    setActiveBuffs((prev) => [...prev, buff])
  }, [])

  const removeBuff = useCallback((buffId: string) => {
    setActiveBuffs((prev) => prev.filter((buff) => buff.id !== buffId))
  }, [])

  const hasBuff = useCallback(
    (buffId: string) => {
      return activeBuffs.some((buff) => buff.id === buffId)
    },
    [activeBuffs]
  )

  const clearBuffs = useCallback(() => {
    setActiveBuffs([])
  }, [])

  return {
    activeBuffs,
    setActiveBuffs,
    addBuff,
    removeBuff,
    hasBuff,
    clearBuffs,
  }
}
