'use client'

import {
  AchievementNotification,
  type Achievement,
} from '@/components/features/Game/AchievementNotification'
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

interface AchievementContextType {
  showAchievement: (achievement: Omit<Achievement, 'id'>) => void
  achievements: Achievement[]
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined)

let achievementIdCounter = 1

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [notifications, setNotifications] = useState<Achievement[]>([])

  const showAchievement = useCallback((achievement: Omit<Achievement, 'id'>) => {
    const newAchievement: Achievement = {
      ...achievement,
      id: achievementIdCounter++,
    }
    setAchievements((prev) => [...prev, newAchievement])
    setNotifications((prev) => [...prev, newAchievement])
  }, [])

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return (
    <AchievementContext.Provider value={{ showAchievement, achievements }}>
      {children}
      {/* Render achievement notifications - positioned in content area */}
      <div className="pointer-events-none fixed inset-0 z-600 flex items-start justify-center">
        <div className="mt-24 flex w-full max-w-6xl flex-col items-end gap-2 px-4">
          {notifications.map((achievement) => (
            <AchievementNotification
              key={achievement.id}
              achievement={achievement}
              onClose={() => removeNotification(achievement.id)}
            />
          ))}
        </div>
      </div>
    </AchievementContext.Provider>
  )
}

export function useAchievement() {
  const context = useContext(AchievementContext)
  if (!context) {
    throw new Error('useAchievement must be used within AchievementProvider')
  }
  return context
}
