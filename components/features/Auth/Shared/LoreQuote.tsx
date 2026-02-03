import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/stack'
import { MutedText } from '@/components/ui/typography'

interface LoreQuoteProps {
  className?: string
  text: string
}

export function LoreQuote({ className, text }: LoreQuoteProps) {
  return (
    <VStack p="md" align="center" className={className} fullWidth>
      <Card variant="muted" fullWidth>
        <Card.Content>
          <MutedText italic align="center">
            {text}
          </MutedText>
        </Card.Content>
      </Card>
    </VStack>
  )
}
