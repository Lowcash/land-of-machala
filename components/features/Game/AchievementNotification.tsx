'use client'

import { Trophy, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Achievement {
  id: number
  title: string
  description: string
  icon?: any
  rarity: AchievementRarity
}

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100)

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const rarityColors = {
    common: {
      border: '#d4a574',
      bg: 'from-[#8b6f47]/90 to-[#6d5a3e]/90',
      glow: 'rgba(212, 165, 116, 0.3)',
    },
    rare: {
      border: '#69ccf0',
      bg: 'from-[#69ccf0]/20 to-[#4dabdb]/20',
      glow: 'rgba(105, 204, 240, 0.4)',
    },
    epic: {
      border: '#c084fc',
      bg: 'from-[#c084fc]/20 to-[#a855f7]/20',
      glow: 'rgba(192, 132, 252, 0.4)',
    },
    legendary: {
      border: '#ffd700',
      bg: 'from-[#ffd700]/20 to-[#ffed4e]/20',
      glow: 'rgba(255, 215, 0, 0.5)',
    },
  }

  const colors = rarityColors[achievement.rarity]
  const Icon = achievement.icon || Trophy

  return (
    <div
      className={`fixed top-20 right-4 z-[600] transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`bg-gradient-to-r ${colors.bg} max-w-md min-w-[320px] rounded-lg border-2 p-4 shadow-2xl backdrop-blur-md`}
        style={{
          borderColor: colors.border,
          boxShadow: `0 0 20px ${colors.glow}, 0 4px 6px rgba(0,0,0,0.3)`,
        }}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className="shrink-0 rounded-full border-2 p-3"
            style={{
              borderColor: colors.border,
              background: `linear-gradient(135deg, ${colors.border}40, ${colors.border}20)`,
              boxShadow: `0 0 15px ${colors.glow}`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: colors.border }} />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-start justify-between gap-2">
              <div
                className="text-xs tracking-wider uppercase opacity-80"
                style={{ color: colors.border, fontFamily: 'var(--font-fantasy)' }}
              >
                Úspěch odemčen
              </div>
              <button
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onClose, 300)
                }}
                className="shrink-0 text-white/60 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mb-1 text-base text-white" style={{ fontFamily: 'var(--font-fantasy)' }}>
              {achievement.title}
            </h3>
            <p className="text-xs leading-relaxed text-white/80">{achievement.description}</p>
          </div>
        </div>

        {/* Progress bar animation */}
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-black/40">
          <div
            className="h-full rounded-full transition-all duration-[5000ms] ease-linear"
            style={{
              width: isVisible ? '0%' : '100%',
              background: colors.border,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
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
