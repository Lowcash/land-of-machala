import { useCallback, useEffect, useState } from 'react'

interface UseNotificationAnimationOptions {
  onClose: () => void
  duration?: number
}

interface UseNotificationAnimationResult {
  isVisible: boolean
  handleClose: () => void
}

const DEFAULT_DURATION = 5000
const FADE_IN_DELAY = 100
const FADE_OUT_DURATION = 300

/**
 * Manages notification animation lifecycle:
 * - Fade in animation
 * - Auto-close timer
 * - Manual close with fade out
 */
export function useNotificationAnimation({
  onClose,
  duration = DEFAULT_DURATION,
}: UseNotificationAnimationOptions): UseNotificationAnimationResult {
  const [isVisible, setIsVisible] = useState(false)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, FADE_OUT_DURATION)
  }, [onClose])

  useEffect(() => {
    // Fade in after mount
    const fadeInTimer = setTimeout(() => setIsVisible(true), FADE_IN_DELAY)

    // Auto-close after duration
    const autoCloseTimer = setTimeout(handleClose, duration)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(autoCloseTimer)
    }
  }, [duration, handleClose])

  return { isVisible, handleClose }
}
