'use client'

import * as React from 'react'

interface GameContext {
  setBackground: (path?: string) => void
}

const GameContext = React.createContext<GameContext | null>(null)

export function GameProvider({ children, ...p }: React.PropsWithChildren) {
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
