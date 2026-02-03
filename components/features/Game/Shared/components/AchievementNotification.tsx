'use client'

import { type LucideIcon, X } from 'lucide-react'

import { type AchievementRarity } from '@/lib/game/constants/achievements'
import { useAchievementConfig } from '@/lib/hooks/game'
import { useNotificationAnimation } from '@/lib/hooks/ui/useNotificationAnimation'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, H3, P } from '@/components/ui/typography'

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

  // 3. Handlers
  const onDismiss = () => handleClose()

  // 4. Sub-components (Render helpers)
  return (
    <VStack
      interactive={isVisible}
      mb="sm"
      _internalClassName={cn(
        'transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <VStack
        p="md"
        rounded="lg"
        backdrop
        border="game"
        bg="black-80"
        _internalClassName={cn('w-full max-w-sm', colors.bg)}
        _internalStyle={{
          borderColor: colors.border,
          boxShadow: `0 0 20px ${colors.glow}40, 0 4px 12px rgba(0,0,0,0.5)`,
        }}
      >
        <HStack align="start" gap="md">
          {/* Icon */}
          <VStack
            rounded="full"
            p="sm"
            _internalStyle={{
              border: `2px solid ${colors.border}`,
              background: `linear-gradient(135deg, ${colors.border}20, ${colors.border}10)`,
              boxShadow: `0 0 15px ${colors.glow}40`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: colors.border }} />
          </VStack>

          <VStack gap="xs" flex="1">
            <HStack justify="between" align="start">
              <Caption bold uppercase font="fantasy" _internalStyle={{ color: colors.border }}>
                Úspěch odemčen
              </Caption>
              <Button onClick={onDismiss} variant="ghost_game" size="icon-xs" icon={X} />
            </HStack>
            <H3 font="fantasy" color="gold">
              {achievement.title}
            </H3>
            <P size="sm" color="copper" opacity="80" leading="relaxed">
              {achievement.description}
            </P>
          </VStack>
        </HStack>

        {/* Progress bar animation */}
        <VStack mt="sm" h="1" rounded="full" bg="black" border="game" overflow="hidden">
          <VStack
            h="full"
            rounded="full"
            _internalClassName="transition-all duration-5000 ease-linear"
            _internalStyle={{
              width: isVisible ? '0%' : '100%',
              background: colors.border,
            }}
          />
        </VStack>
      </VStack>
    </VStack>
  )
}
