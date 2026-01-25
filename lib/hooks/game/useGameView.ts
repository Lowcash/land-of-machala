import type { View } from '@/lib/game/config'
import { useState } from 'react'

export function useGameView(initialView: View = 'town') {
  const [currentView, setCurrentView] = useState<View>(initialView)

  const goToView = (view: View) => setCurrentView(view)
  const goBack = () => setCurrentView('town')

  return {
    currentView,
    goToView,
    goBack,
  }
}
