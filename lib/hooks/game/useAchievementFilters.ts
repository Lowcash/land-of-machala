'use client'

import { useMemo, useState } from 'react'

export type FilterType = 'all' | 'unlocked' | 'locked'

interface MinimalAchievement {
  unlocked?: boolean
  title: string
}

interface UseAchievementFiltersOptions<T extends MinimalAchievement> {
  achievements: T[]
  initialFilter?: FilterType
}

interface UseAchievementFiltersResult<T> {
  filter: FilterType
  search: string
  filteredAchievements: T[]
  unlockedCount: number
  actions: {
    setFilter: (filter: FilterType) => void
    setSearch: (search: string) => void
  }
}

/**
 * Manages achievement filtering and search functionality
 * @param options - Achievements array and optional initial filter
 * @returns Filtered achievements and filter controls
 */
export function useAchievementFilters<T extends MinimalAchievement>({
  achievements,
  initialFilter = 'all',
}: UseAchievementFiltersOptions<T>): UseAchievementFiltersResult<T> {
  // Hooks
  const [filter, setFilter] = useState<FilterType>(initialFilter)
  const [search, setSearch] = useState('')

  // Derived values
  const unlockedCount = useMemo(() => achievements.filter((a) => a.unlocked).length, [achievements])

  const filteredAchievements = useMemo(() => {
    return achievements
      .filter((a) => {
        if (filter === 'unlocked') return a.unlocked
        if (filter === 'locked') return !a.unlocked
        return true
      })
      .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
  }, [achievements, filter, search])

  return {
    filter,
    search,
    filteredAchievements,
    unlockedCount,
    actions: {
      setFilter,
      setSearch,
    },
  }
}
