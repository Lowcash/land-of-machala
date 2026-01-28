'use client'

import { useCallback, useState } from 'react'

/**
 * Hook for managing info/notification text
 * Reduces prop drilling for setInfoText
 */
export function useInfoText(initialText: string | null = null) {
  const [infoText, setInfoText] = useState<string | null>(initialText)

  const showInfo = useCallback((text: string) => {
    setInfoText(text)
  }, [])

  const showError = useCallback((text: string) => {
    setInfoText(`<span class="text-[#ff6b6b]">Chyba:</span> ${text}`)
  }, [])

  const showSuccess = useCallback((text: string) => {
    setInfoText(`<span class="text-[#6fbf6f]">✓</span> ${text}`)
  }, [])

  const showWarning = useCallback((text: string) => {
    setInfoText(`<span class="text-[#ffd700]">⚠</span> ${text}`)
  }, [])

  const clearInfo = useCallback(() => {
    setInfoText(null)
  }, [])

  return {
    infoText,
    setInfoText,
    showInfo,
    showError,
    showSuccess,
    showWarning,
    clearInfo,
  }
}
