'use client'

import { type ReactNode, createContext, useContext } from 'react'

import { useInfoLog } from '@/lib/hooks/game'

interface GameDashboardContextType {
  infoText: string | null
  isShaking: boolean
  setInfoText: (text: string | null) => void
}

const GameDashboardContext = createContext<GameDashboardContextType | undefined>(undefined)

export function GameDashboardProvider({ children }: { children: ReactNode }) {
  const { infoText, isShaking, handleSetInfoText } = useInfoLog()

  return (
    <GameDashboardContext.Provider
      value={{
        infoText,
        isShaking,
        setInfoText: handleSetInfoText,
      }}
    >
      {children}
    </GameDashboardContext.Provider>
  )
}

export function useGameDashboardState() {
  const context = useContext(GameDashboardContext)
  if (context === undefined) {
    throw new Error('useGameDashboardState must be used within a GameDashboardProvider')
  }
  return context
}
