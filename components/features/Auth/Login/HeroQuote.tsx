'use client'

import { useEffect, useState } from 'react'

import { HERO_TEXTS } from '@/lib/constants/auth-texts'

export function HeroQuote() {
  const [text, setText] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setText(HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] ?? HERO_TEXTS[0]!)
  }, [])

  if (!mounted) return null

  return (
    <div className="rounded-lg border border-[#8b6f47]/50 bg-black/60 p-4 text-center text-sm text-[#8b7355] italic">
      {text}
    </div>
  )
}
