'use client'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ScrollIndicatorProps {
  targetRef: React.RefObject<HTMLElement>
  position?: 'top' | 'bottom' | 'both' | 'left' | 'right'
  className?: string
}

export function ScrollIndicator({
  targetRef,
  position = 'bottom',
  className = '',
}: ScrollIndicatorProps) {
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
        element

      // Vertical
      setShowTop(scrollTop > 10)
      setShowBottom(scrollHeight - scrollTop - clientHeight > 10)

      // Horizontal
      setShowLeft(scrollLeft > 10)
      setShowRight(scrollWidth - scrollLeft - clientWidth > 10)
    }

    element.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    // Check on resize too
    window.addEventListener('resize', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [targetRef])

  return (
    <>
      <div className={`pointer-events-none absolute inset-0 z-20 ${className}`}>
        {/* Top Gradient & Icon */}
        {(position === 'top' || position === 'both') && (
          <div
            className={`absolute top-0 right-0 left-0 flex h-12 items-start justify-center bg-linear-to-b from-black/80 to-transparent pt-1 transition-opacity duration-300 ${
              showTop ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ChevronUp className="animate-bounce text-[#ffd700]" />
          </div>
        )}

        {/* Bottom Gradient & Icon */}
        {(position === 'bottom' || position === 'both') && (
          <div
            className={`absolute right-0 bottom-0 left-0 flex h-12 items-end justify-center bg-linear-to-t from-black/80 to-transparent pb-1 transition-opacity duration-300 ${
              showBottom ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ChevronDown className="animate-bounce text-[#ffd700]" />
          </div>
        )}

        {/* Left Gradient & Icon (for horizontal) */}
        {(position === 'left' || position === 'both') && showLeft && (
          <div
            className={`absolute top-0 bottom-0 left-0 flex w-12 items-center justify-start bg-linear-to-r from-black/80 to-transparent pl-1 transition-opacity duration-300`}
          >
            <ChevronLeft className="animate-bounce text-[#ffd700]" />
          </div>
        )}

        {/* Right Gradient & Icon (for horizontal) */}
        {(position === 'right' || position === 'both') && showRight && (
          <div
            className={`absolute top-0 right-0 bottom-0 flex w-12 items-center justify-end bg-linear-to-l from-black/80 to-transparent pr-1 transition-opacity duration-300`}
          >
            <ChevronRight className="animate-bounce text-[#ffd700]" />
          </div>
        )}
      </div>
    </>
  )
}
