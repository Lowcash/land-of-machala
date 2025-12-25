import { useEffect, useState } from 'react'

/**
 * Custom hook for managing detail view state with browser history integration
 *
 * @param items - Array of items to select from
 * @param paramName - URL parameter name (e.g., 'skillId', 'questId')
 * @returns Selected item state and update functions
 *
 * @example
 * ```tsx
 * const { selectedItem, selectItem, clearSelection } = useDetailViewHistory(skills, 'skillId')
 * ```
 */
export function useDetailViewHistory<T extends { id: string }>(items: T[], paramName: string) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Sync state with URL on mount and back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const id = params.get(paramName)

      if (id && items.find((item) => item.id === id)) {
        setSelectedId(id)
      } else {
        setSelectedId(null)
      }
    }

    // Handle initial URL on mount (supports direct URLs)
    handlePopState()

    // Listen for browser back/forward
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [items, paramName])

  /**
   * Select an item and update URL history
   */
  const selectItem = (id: string | null) => {
    if (id) {
      setSelectedId(id)
      window.history.pushState({ [paramName]: id }, '', `?${paramName}=${id}`)
    } else {
      setSelectedId(null)
      const url = new URL(window.location.href)
      url.searchParams.delete(paramName)
      window.history.pushState({}, '', url.toString())
    }
  }

  /**
   * Clear selection (same as selectItem(null))
   */
  const clearSelection = () => selectItem(null)

  /**
   * Navigate back in browser history
   */
  const navigateBack = () => {
    window.history.back()
  }

  return {
    selectedId,
    selectedItem: items.find((item) => item.id === selectedId) ?? null,
    selectItem,
    clearSelection,
    navigateBack,
  }
}
