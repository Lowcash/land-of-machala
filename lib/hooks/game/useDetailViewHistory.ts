'use client'

import { useEffect, useState } from 'react'

export function useDetailViewHistory<T extends { id: string }>(items: T[], paramName: string) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

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

    handlePopState()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [items, paramName])

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

  const clearSelection = () => selectItem(null)

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
