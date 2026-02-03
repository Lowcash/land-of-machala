'use client'

import { cn } from '@/lib/utils'

import { useGameDashboardState } from '@/components/features/Game/Dashboard/GameDashboardProvider'
import { RichText } from '@/components/ui/rich-text'

interface GameDashboardActivityProps {
  viewDesc: string
}

export function GameDashboardActivity({ viewDesc }: GameDashboardActivityProps) {
  const { infoText, isShaking } = useGameDashboardState()

  return (
    <RichText
      as="div"
      size="sm"
      color="copper"
      content={infoText || viewDesc}
      _internalClassName={cn(
        'mx-auto max-w-2xl animate-fade-in-wave',
        isShaking && 'animate-shake'
      )}
      key={infoText || viewDesc}
    />
  )
}
