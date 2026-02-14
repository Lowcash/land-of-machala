import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { ScrollIcon } from '@/components/ui/icons'
import { Legend, MutedText } from '@/components/ui/prefabs/typography/shared'

export interface TranslatedChangelogEntry {
  category?: string
  description: string
  color?: 'success' | 'info' | 'danger' | 'gold' | 'secondary'
}

interface ChangelogProps {
  title: string
  changes: TranslatedChangelogEntry[]
  minimal?: boolean
  forceMinimal?: boolean
}

export function Changelog({ title, changes, minimal, forceMinimal }: ChangelogProps) {
  const content = (
    <List>
      {changes.map((entry, i) => (
        <ChangelogEntry key={i} entry={entry} />
      ))}
    </List>
  )

  if (forceMinimal) {
    return (
      <Card variant="subtle" padding="md">
        <Card.Content>{content}</Card.Content>
      </Card>
    )
  }

  if (minimal) {
    return (
      <>
        <Card variant="subtle" padding="md" lg={{ display: 'none' }}>
          <Card.Content>{content}</Card.Content>
        </Card>

        <Card variant="primary" display="none" lg={{ display: 'flex' }} padding="lg">
          <Card.Header>
            <Card.Title icon={<ScrollIcon />}>{title}</Card.Title>
          </Card.Header>
          <Card.Content>{content}</Card.Content>
        </Card>
      </>
    )
  }

  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<ScrollIcon />}>{title}</Card.Title>
      </Card.Header>

      <Card.Content>{content}</Card.Content>
    </Card>
  )
}

function ChangelogEntry({ entry }: { entry: TranslatedChangelogEntry }) {
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
