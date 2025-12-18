'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ScrollIndicatorProps {
  targetRef: React.RefObject<HTMLElement | null>
  position?: 'top' | 'bottom' | 'both'
  className?: string
}

export function ScrollIndicator({
  targetRef,
  position = 'bottom',
  className = '',
}: ScrollIndicatorProps) {
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element
      const isAtTop = scrollTop === 0
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5

      if (position === 'top' || position === 'both') {
        setShowTop(!isAtTop && scrollTop > 20)
      }

      if (position === 'bottom' || position === 'both') {
        setShowBottom(!isAtBottom && scrollHeight > clientHeight)
      }
    }

    checkScroll()
    element.addEventListener('scroll', checkScroll)

    // Also check on resize
    const resizeObserver = new ResizeObserver(checkScroll)
    resizeObserver.observe(element)

    return () => {
      element.removeEventListener('scroll', checkScroll)
      resizeObserver.disconnect()
    }
  }, [targetRef, position])

  return (
    <>
      {/* Top fade indicator */}
      {showTop && (position === 'top' || position === 'both') && (
        <div
          className={`pointer-events-none absolute top-0 right-0 left-0 z-10 h-12 bg-gradient-to-b from-black/80 via-black/40 to-transparent ${className}`}
        >
          <div className="flex h-full items-center justify-center">
            <ChevronDown className="h-4 w-4 rotate-180 animate-bounce text-[#ffd700]" />
          </div>
        </div>
      )}

      {/* Bottom fade indicator */}
      {showBottom && (position === 'bottom' || position === 'both') && (
        <div
          className={`pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${className}`}
        >
          <div className="flex h-full items-center justify-center">
            <ChevronDown className="h-4 w-4 animate-bounce text-[#ffd700]" />
          </div>
        </div>
      )}
    </>
  )
}
