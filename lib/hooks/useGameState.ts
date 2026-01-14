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

/**
 * Hook for managing info/notification text
 * Reduces prop drilling for setInfoText
 */
export function useInfoText(initialText: string | null = null) {
  const [infoText, setInfoText] = useState<string | null>(initialText)

  const showInfo = useCallback((text: string) => {
    setInfoText(text)
  }, [])

  const showError = useCallback((text: string) => {
    setInfoText(`<span class="text-[#ff6b6b]">Chyba:</span> ${text}`)
  }, [])

  const showSuccess = useCallback((text: string) => {
    setInfoText(`<span class="text-[#6fbf6f]">✓</span> ${text}`)
  }, [])

  const showWarning = useCallback((text: string) => {
    setInfoText(`<span class="text-[#ffd700]">⚠</span> ${text}`)
  }, [])

  const clearInfo = useCallback(() => {
    setInfoText(null)
  }, [])

  return {
    infoText,
    setInfoText,
    showInfo,
    showError,
    showSuccess,
    showWarning,
    clearInfo,
  }
}

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

/**
 * Hook for managing view state (reduces large switch/conditional logic)
 */
export function useViewState<T extends string>(initialView: T) {
  const [currentView, setCurrentView] = useState<T>(initialView)
  const [viewHistory, setViewHistory] = useState<T[]>([initialView])

  const navigateTo = useCallback((view: T) => {
    setCurrentView(view)
    setViewHistory((prev) => [...prev, view])
  }, [])

  const goBack = useCallback(() => {
    if (viewHistory.length > 1) {
      setViewHistory((prev) => {
        const newHistory = prev.slice(0, -1)
        const previousView = newHistory[newHistory.length - 1]
        if (previousView !== undefined) {
          setCurrentView(previousView)
        }
        return newHistory
      })
    }
  }, [viewHistory])

  const resetToHome = useCallback(() => {
    const homeView = viewHistory[0]
    if (homeView !== undefined) {
      setCurrentView(homeView)
      setViewHistory([homeView])
    }
  }, [viewHistory])

  const isView = useCallback(
    (view: T) => {
      return currentView === view
    },
    [currentView]
  )

  return {
    currentView,
    viewHistory,
    setCurrentView,
    navigateTo,
    goBack,
    resetToHome,
    isView,
    canGoBack: viewHistory.length > 1,
  }
}
