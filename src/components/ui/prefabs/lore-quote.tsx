import { resolveLoreQuote } from '@/lib/game/utils/resolvers'

import { Card } from '@/components/ui/core/card'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

export function LoreQuote() {
  const quote = resolveLoreQuote()

  return (
    <Card variant="subtle">
      <Card.Content>
        <MutedText textAlign="center">
          {quote}
        </MutedText>
      </Card.Content>
    </Card>
  )
}
