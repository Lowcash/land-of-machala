import { Card } from '@/components/ui/card'
import { DetailRow } from '@/components/ui/display'
import { VStack } from '@/components/ui/stack'
import { P, SectionHeading } from '@/components/ui/typography'

interface QuestInfoPanelProps {
  giver?: string | null
  location?: string | null
  story?: string | null
}

export function QuestInfoPanel({ giver, location, story }: QuestInfoPanelProps) {
  return (
    <VStack gap="md">
      <Card variant="muted">
        <Card.Content>
          <VStack gap="xs">
            <DetailRow
              label="Zadavatel"
              value={giver || 'Neznámý'}
              px="none"
              py="none"
              labelVariant="caption"
            />
            <DetailRow
              label="Lokace"
              value={location || 'Neznámá'}
              px="none"
              py="none"
              labelVariant="caption"
            />
          </VStack>
        </Card.Content>
      </Card>

      {story && (
        <Card variant="muted">
          <Card.Content>
            <VStack gap="sm">
              <SectionHeading>Příběh:</SectionHeading>
              <P color="copper" italic>
                {story}
              </P>
            </VStack>
          </Card.Content>
        </Card>
      )}
    </VStack>
  )
}
