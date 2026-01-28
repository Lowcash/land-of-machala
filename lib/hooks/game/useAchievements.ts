'use client'

import { useState } from 'react'

import type { LucideIcon } from 'lucide-react'

type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Achievement {
  id: number
  title: string
  description: string
  icon?: LucideIcon
  rarity: AchievementRarity
}

// Achievement Manager Hook
export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [notifications, setNotifications] = useState<Achievement[]>([])

  const unlockAchievement = (achievement: Achievement) => {
    setAchievements((prev) => [...prev, achievement])
    setNotifications((prev) => [...prev, achievement])
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((a) => a.id !== id))
  }

  return {
    achievements,
    notifications,
    unlockAchievement,
    removeNotification,
  }
}
