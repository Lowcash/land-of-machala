import { Card } from '@/components/ui/core/card'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

interface LoreQuoteProps {
  quote: string
}

export function LoreQuote({ quote }: LoreQuoteProps) {
  return (
    <Card
      variant="subtle"
      p="md"
      md={{ p: 'lg' }}
      justify="center"
      align="center"
      minHeight="zero"
      fullWidth
    >
      <MutedText align="center">{quote}</MutedText>
    </Card>
  )
}
