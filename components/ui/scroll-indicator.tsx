'use client'

import { useEffect, useState } from 'react'

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'

import { VStack } from './stack'

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
    <VStack position="absolute" inset="0" z="20" interactive={false} _internalClassName={className}>
      {/* Top Gradient & Icon */}
      {(position === 'top' || position === 'both') && (
        <VStack
          position="absolute"
          top="0"
          right="0"
          left="0"
          h="12"
          align="center"
          justify="start"
          pt="1"
          _internalClassName={cn(
            'bg-linear-to-b from-black/80 to-transparent transition-opacity duration-300',
            showTop ? 'opacity-100' : 'opacity-0'
          )}
        >
          <ChevronUp className="animate-bounce text-[#ffd700]" />
        </VStack>
      )}

      {/* Bottom Gradient & Icon */}
      {(position === 'bottom' || position === 'both') && (
        <VStack
          position="absolute"
          right="0"
          bottom="0"
          left="0"
          h="12"
          align="center"
          justify="end"
          pb="1"
          _internalClassName={cn(
            'bg-linear-to-t from-black/80 to-transparent transition-opacity duration-300',
            showBottom ? 'opacity-100' : 'opacity-0'
          )}
        >
          <ChevronDown className="animate-bounce text-[#ffd700]" />
        </VStack>
      )}

      {/* Left Gradient & Icon (for horizontal) */}
      {(position === 'left' || position === 'both') && showLeft && (
        <VStack
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          w="12"
          align="center"
          justify="start"
          pl="1"
          _internalClassName="bg-linear-to-r from-black/80 to-transparent transition-opacity duration-300"
        >
          <ChevronLeft className="animate-bounce text-[#ffd700]" />
        </VStack>
      )}

      {/* Right Gradient & Icon (for horizontal) */}
      {(position === 'right' || position === 'both') && showRight && (
        <VStack
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          w="12"
          align="center"
          justify="end"
          pr="1"
          _internalClassName="bg-linear-to-l from-black/80 to-transparent transition-opacity duration-300"
        >
          <ChevronRight className="animate-bounce text-[#ffd700]" />
        </VStack>
      )}
    </VStack>
  )
}
