'use client'

import { useState } from 'react'

export function useInfoLog() {
  const [infoText, setInfoText] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)

  const handleSetInfoText = (text: string | null) => {
    if (!text) {
      setInfoText(null)
      setIsShaking(false)
      return
    }

    setInfoText(text)

    // Check for error/warning indicators in the text to trigger alert behavior
    const isAlert =
      text.includes('text-game-danger') ||
      text.includes('text-game-info') ||
      text.includes('⚠️') ||
      text.includes('Chyba')

    if (isAlert) {
      setIsShaking(true)
      setTimeout(() => {
        setInfoText(null)
        setIsShaking(false)
      }, 3000)
    } else {
      setIsShaking(false)
    }
  }

  return { infoText, isShaking, handleSetInfoText }
}
