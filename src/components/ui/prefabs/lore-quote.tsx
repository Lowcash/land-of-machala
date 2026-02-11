import { LORE_QUOTES } from '@/lib/game/constants/lore'

import { Card } from '@/components/ui/core/card'
import { Text } from '@/components/ui/core/typography'

export function LoreQuote() {
  const randomIndex = Math.floor(Math.random() * LORE_QUOTES.length)
  const quote = LORE_QUOTES[randomIndex]

  return (
    <Card variant="subtle">
      <Card.Content>
        <Text font="body" variant="muted" className="text-center italic">
          {quote}
        </Text>
      </Card.Content>
    </Card>
  )
}
