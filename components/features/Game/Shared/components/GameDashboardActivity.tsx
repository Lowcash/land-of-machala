'use client'

import { useGameDashboardState } from '@/components/features/Game/Dashboard/GameDashboardProvider'

interface GameDashboardActivityProps {
  viewDesc: string
}

export function GameDashboardActivity({ viewDesc }: GameDashboardActivityProps) {
  const { infoText, isShaking } = useGameDashboardState()

  return (
    <div
      className={`animate-fade-in-wave mx-auto max-w-2xl py-1 text-center text-sm leading-relaxed text-[#f5e6d3] ${
        isShaking ? 'animate-shake' : ''
      }`}
      key={infoText || viewDesc}
      dangerouslySetInnerHTML={{ __html: infoText || viewDesc }}
    />
  )
}
