'use client'

import { type LucideIcon, X } from 'lucide-react'

import { type AchievementRarity } from '@/lib/game/constants/achievements'
import { useAchievementConfig } from '@/lib/hooks/game'
import { useNotificationAnimation } from '@/lib/hooks/ui/useNotificationAnimation'

import { Button } from '@/components/ui/button'

export interface Achievement {
  id: number
  title: string
  description: string
  icon?: LucideIcon
  rarity: AchievementRarity
}

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  // 1. Hooks
  const { isVisible, handleClose } = useNotificationAnimation({
    onClose,
    duration: 15000,
  })

  const { colors, Icon } = useAchievementConfig({
    rarity: achievement.rarity,
    icon: achievement.icon,
  })

  // 2. Navigation State - None currently

  // 3. Handlers
  const onDismiss = () => handleClose()

  // 4. Sub-components (Render helpers)
  return (
    <div
      className={`pointer-events-auto mb-3 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`bg-linear-to-r ${colors.bg} w-full max-w-sm rounded-lg border p-4 backdrop-blur-md`}
        style={{
          borderColor: colors.border,
          boxShadow: `0 0 15px ${colors.glow}, 0 4px 6px rgba(0,0,0,0.3)`,
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

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-start justify-between gap-2">
              <div
                className="text-xs tracking-wider uppercase opacity-80"
                style={{ color: colors.border, fontFamily: 'var(--font-fantasy)' }}
              >
                Úspěch odemčen
              </div>
              <Button
                onClick={onDismiss}
                variant="ghost"
                size="icon"
                className="h-5 w-5 shrink-0 p-0 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
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
            className="h-full rounded-full transition-all duration-5000 ease-linear"
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
