'use client'

import React from 'react'
import { type Location } from '@/config'

import { LOCATION } from '@/config'

interface GameContext {
  setBackground: (path?: string) => void
}

const GameContext = React.createContext<GameContext | null>(null)

export function GameProvider({ children }: React.PropsWithChildren) {
  const [background, setBackground] = React.useState<string>()

  React.useEffect(() => {
    document.body.style.backgroundImage = background ? `url(${background})` : 'unset'
  }, [background])

  return <GameContext.Provider value={{ setBackground }}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = React.useContext(GameContext)

  if (!context) throw new Error('useGame must be used within a GameProvider')

  return context
}

export function useBackground(location?: Location) {
  const { setBackground } = useGame()

  React.useEffect(() => location && setBackground(LOCATION[location]), [setBackground, location])

  return { setLocation: (location: Location) => setBackground(LOCATION[location]) }
}
