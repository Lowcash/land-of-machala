'use client'

import { viewData } from '@/lib/game/constants/views'
import { useGameMove, useGameView, useInfoLog } from '@/lib/hooks/game'
import type { Buff, CharacterData, View } from '@/lib/types/game'
import type { MarketItem } from '@/lib/types/market'

interface DashboardCharacterData extends CharacterData {
  inventory?: MarketItem[]
  xpToNextLevel?: number
  activeBuffs?: Buff[]
}

interface UseGameDashboardProps {
  character: DashboardCharacterData
  initialView?: string
}

export function useGameDashboard({ character, initialView }: UseGameDashboardProps) {
  const { currentView, goToView, goBack } = useGameView((initialView as View) || 'town')
  const { infoText, isShaking, handleSetInfoText } = useInfoLog()

  const { handleMove } = useGameMove({
    handleSetInfoText,
  })

  // Get current view data
  const currentViewData = viewData[currentView]

  return {
    currentView,
    goToView,
    goBack,
    infoText,
    isShaking,
    handleSetInfoText,
    gold: character.gold || 0,
    activeBuffs: character.activeBuffs || [],
    inventory: character.inventory || [],
    handleMove,
    currentViewData,
  }
}
