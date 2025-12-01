'use client'

import React from 'react'
import type { Location } from '@/types'
import { LOCATION } from '@/config/game-constants'

interface GameContext {
  setLocationBackground: (location?: Location) => void
}

const GameContext = React.createContext<GameContext | null>(null)

export function GameProvider({ children }: React.PropsWithChildren) {
  const setLocationBackground = (location?: Location) => {
    const aside = document.getElementsByTagName('aside')[0]
    if (!aside) return

    aside.style.backgroundImage = location && LOCATION[location] ? `url(${LOCATION[location]})` : 'unset'
  }

  return <GameContext.Provider value={{ setLocationBackground }}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = React.useContext(GameContext)

  if (!context) throw new Error('useGame must be used within a GameProvider')

  return context
}

export function useSetLocationBackgroundEffect(location?: Location) {
  const setLocationBackground = useGame().setLocationBackground

  React.useEffect(() => {
    setLocationBackground(location)

    // TODO potencial bug and can cause screen blinking
    return () => setLocationBackground()
  }, [location, setLocationBackground])
}
