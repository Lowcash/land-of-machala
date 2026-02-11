import { type ChangelogEntry as ChangelogData } from '@/lib/game/constants/changelog'

import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { ScrollIcon } from '@/components/ui/icons'
import { Legend, MutedText } from '@/components/ui/prefabs/typography/shared'
import { VStack } from '@/components/ui/core/stack'

interface ChangelogProps {
  changes: ChangelogData[]
  minimal?: boolean
}

export function Changelog({ changes, minimal }: ChangelogProps) {
  const content = (
    <List>
      {changes.map((entry, i) => (
        <ChangelogEntry key={i} entry={entry} />
      ))}
    </List>
  )

  if (minimal) {
    return content
  }

  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<ScrollIcon />}>Nejnovější změny</Card.Title>
      </Card.Header>

      <Card.Content>{content}</Card.Content>
    </Card>
  )
}

function ChangelogEntry({ entry }: { entry: ChangelogData }) {
  return (
    <ListItem>
      <MutedText>
        {entry.category && (
          <Legend as="span" color={entry.color as any} bold>
            {entry.category}:{' '}
          </Legend>
        )}
        {entry.description}
      </MutedText>
    </ListItem>
  )
}
