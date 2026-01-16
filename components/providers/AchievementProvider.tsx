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
      {/* Achievement notifications - positioned at content container edge (like massage-website) */}
      <div className="pointer-events-none fixed inset-0 z-600 flex items-start justify-center">
        <div className="relative mx-auto mt-20 w-full max-w-6xl px-4">
          <div className="flex flex-col items-end gap-2">
            {notifications.map((achievement) => (
              <AchievementNotification
                key={achievement.id}
                achievement={achievement}
                onClose={() => removeNotification(achievement.id)}
              />
            ))}
          </div>
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
