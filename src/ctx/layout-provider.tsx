'use client'

import * as React from 'react'

interface LayoutContextProps {
  setBackgroundUrl?: (url?: string) => void
}

const LayoutContext = React.createContext<LayoutContextProps>({})

export function LayoutProvider({ children, ...p }: React.PropsWithChildren) {
  const [backgroundUrl, setBackgroundUrl] = React.useState<string>()

  React.useEffect(() => {
    document.body.style.backgroundImage = backgroundUrl ? `url(${backgroundUrl})` : 'unset'
  }, [backgroundUrl])

  return <LayoutContext.Provider value={{ setBackgroundUrl }}>{children}</LayoutContext.Provider>
}

export function useLayoutContext() {
  return React.useContext(LayoutContext)
}
