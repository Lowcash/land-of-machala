'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    // Enhanced fade in with wave effect
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [text])

  return (
    <div
      className={`${className} ${isVisible ? 'animate-fade-in-wave opacity-100' : 'opacity-0'}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
