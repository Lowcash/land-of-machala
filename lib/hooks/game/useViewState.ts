'use client'

import { useCallback, useState } from 'react'

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
