'use client'

import { useState } from 'react'

import { viewData } from '@/lib/game/constants/views'
import { useGameMove, useGameView, useInfoLog } from '@/lib/hooks/game'
import type { CharacterData } from '@/lib/types/game'
import type { MarketItem } from '@/lib/types/market'

interface DashboardCharacterData extends CharacterData {
  inventory?: MarketItem[]
  xpToNextLevel?: number
  bankGold?: number
}

interface UseGameDashboardProps {
  character: DashboardCharacterData
}

interface Buff {
  name: string
  stat: string
  val: number
}

export function useGameDashboard({ character }: UseGameDashboardProps) {
  const { currentView, goToView, goBack } = useGameView('town')
  const { infoText, isShaking, handleSetInfoText } = useInfoLog()

  // Local state for game interactions
  const [gold, setGold] = useState(character.gold || 0)
  const [activeBuffs, setActiveBuffs] = useState<Buff[]>([])
  const [inventory, setInventory] = useState<MarketItem[]>(character.inventory || [])

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
    gold,
    setGold,
    activeBuffs,
    setActiveBuffs,
    inventory,
    setInventory,
    handleMove,
    currentViewData,
  }
}
