'use client'

import { useEffect, useState } from 'react'

import { HERO_TEXTS } from '@/lib/constants/auth-texts'

import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/stack'
import { MutedText } from '@/components/ui/typography'

export function HeroQuote() {
  const [text, setText] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setText(HERO_TEXTS[Math.floor(Math.random() * HERO_TEXTS.length)] ?? HERO_TEXTS[0]!)
  }, [])

  if (!mounted) return null

  return (
    <Card variant="muted">
      <Card.Content>
        <VStack align="center" fullWidth>
          <MutedText italic>{text}</MutedText>
        </VStack>
      </Card.Content>
    </Card>
  )
}
