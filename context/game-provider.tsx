'use client'

import React from 'react'
import type { Location } from '@/types'

import { LOCATION } from '@/config'

interface GameContext {
  setBackground: (path?: string) => void
  setLocationBackground: (location?: Location) => void
}

const GameContext = React.createContext<GameContext | null>(null)

export function GameProvider({ children }: React.PropsWithChildren) {
  const [background, setBackground] = React.useState<string>()

  React.useEffect(() => {
    document.body.style.backgroundImage = background ? `url(${background})` : 'unset'
  }, [background])

  return (
    <GameContext.Provider
      value={{
        setBackground,
        setLocationBackground: (location?: Location) => setBackground(location && LOCATION[location]),
      }}
    >
      {children}
    </GameContext.Provider>
  )
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
  }, [location])
}