'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { VStack } from '@/components/ui/stack'

interface TypewriterTextProps {
  text: string
  /** Internal use only */
  _internalClassName?: string
}

export function TypewriterText({ text, _internalClassName }: TypewriterTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    // Enhanced fade in with wave effect
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <VStack
      _internalClassName={cn(
        _internalClassName,
        isVisible ? 'animate-fade-in-wave opacity-100' : 'opacity-0'
      )}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
