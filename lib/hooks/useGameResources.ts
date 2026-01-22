'use client'

import { useCallback, useState } from 'react'

interface Item {
  id: string
  [key: string]: unknown
}

/**
 * Unified hook for managing game resources (gold, inventory, bank items)
 * Reduces prop drilling and consolidates state management
 */
export function useGameResources(initialGold: number = 0) {
  const [gold, setGold] = useState(initialGold)
  const [bankGold, setBankGold] = useState(0)
  const [inventory, setInventory] = useState<Item[]>([])
  const [bankItems, setBankItems] = useState<Item[]>([])

  const addGold = useCallback((amount: number) => {
    setGold((prev) => prev + amount)
  }, [])

  const removeGold = useCallback((amount: number) => {
    setGold((prev) => Math.max(0, prev - amount))
  }, [])

  const hasGold = useCallback(
    (amount: number) => {
      return gold >= amount
    },
    [gold]
  )

  const depositGold = useCallback(
    (amount: number) => {
      if (gold >= amount) {
        setGold((prev) => prev - amount)
        setBankGold((prev) => prev + amount)
        return true
      }
      return false
    },
    [gold]
  )

  const withdrawGold = useCallback(
    (amount: number) => {
      if (bankGold >= amount) {
        setBankGold((prev) => prev - amount)
        setGold((prev) => prev + amount)
        return true
      }
      return false
    },
    [bankGold]
  )

  const addItem = useCallback((item: Item) => {
    setInventory((prev) => [...prev, item])
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  const depositItem = useCallback(
    (itemId: string) => {
      const item = inventory.find((i) => i.id === itemId)
      if (item) {
        removeItem(itemId)
        setBankItems((prev) => [...prev, item])
        return true
      }
      return false
    },
    [inventory, removeItem]
  )

  const withdrawItem = useCallback(
    (itemId: string) => {
      const item = bankItems.find((i) => i.id === itemId)
      if (item) {
        setBankItems((prev) => prev.filter((i) => i.id !== itemId))
        addItem(item)
        return true
      }
      return false
    },
    [bankItems, addItem]
  )

  return {
    // State
    gold,
    bankGold,
    inventory,
    bankItems,
    totalGold: gold + bankGold,

    // Actions
    setGold,
    setBankGold,
    setInventory,
    setBankItems,
    addGold,
    removeGold,
    hasGold,
    depositGold,
    withdrawGold,
    addItem,
    removeItem,
    depositItem,
    withdrawItem,
  }
}
