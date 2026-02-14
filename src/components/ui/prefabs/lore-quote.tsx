import { Card } from '@/components/ui/core/card'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

interface LoreQuoteProps {
  quote: string
}

export function LoreQuote({ quote }: LoreQuoteProps) {
  return (
    <Card variant="subtle">
      <Card.Content>
        <MutedText align="center">{quote}</MutedText>
      </Card.Content>
    </Card>
  )
}
