'use client'

import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export function Tooltip({ content, children, position = 'top', delay = 0 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isPositioned, setIsPositioned] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (delay === 0) {
      setIsVisible(true)
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  // Close tooltip on any click
  useEffect(() => {
    const handleClick = () => {
      setIsVisible(false)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let x = 0
    let y = 0

    switch (position) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.top - tooltipRect.height - 8
        break
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.bottom + 8
        break
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
      case 'right':
        x = triggerRect.right + 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Keep tooltip in viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8))
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8))

    setCoords({ x, y })
    setIsPositioned(true)
  }, [position])

  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    } else {
      setIsPositioned(false)
    }
  }, [isVisible, updatePosition])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`pointer-events-none fixed z-9999 transition-opacity duration-75 ${isPositioned ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
          }}
        >
          <div className="max-w-xs rounded-lg border-2 border-[#d4a574] bg-black/95 px-3 py-2 shadow-2xl backdrop-blur-md">
            <div className="text-xs leading-relaxed text-[#f5e6d3]">{content}</div>
          </div>

          {/* Arrow */}
          <div
            className="absolute h-2 w-2 rotate-45 border-[#d4a574] bg-black/95"
            style={{
              [position === 'top'
                ? 'bottom'
                : position === 'bottom'
                  ? 'top'
                  : position === 'left'
                    ? 'right'
                    : 'left']: '-4px',
              [position === 'left' || position === 'right' ? 'top' : 'left']: '50%',
              transform:
                position === 'left' || position === 'right'
                  ? 'translateY(-50%) rotate(45deg)'
                  : 'translateX(-50%) rotate(45deg)',
              borderWidth:
                position === 'top'
                  ? '0 2px 2px 0'
                  : position === 'bottom'
                    ? '2px 0 0 2px'
                    : position === 'left'
                      ? '2px 2px 0 0'
                      : '0 0 2px 2px',
            }}
          ></div>
        </div>
      )}
    </>
  )
}
