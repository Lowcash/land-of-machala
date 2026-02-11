'use client'

import * as React from 'react'

import { Card } from '@/components/ui/core/card'
import { Text } from '@/components/ui/core/typography'
import { LORE_QUOTES } from '@/lib/game/constants/lore'

export function LoreQuote() {
  const [quote, setQuote] = React.useState('')

  React.useEffect(() => {
    // Randomize on mount (client-side)
    const randomIndex = Math.floor(Math.random() * LORE_QUOTES.length)
    setQuote(LORE_QUOTES[randomIndex])
  }, [])

  if (!quote) return null

  return (
    <Card variant="subtle">
      <Card.Content>
        <Text
          font="body"
          variant="muted"
          className="italic text-center"
        >
          {quote}
        </Text>
      </Card.Content>
    </Card>
  )
}
