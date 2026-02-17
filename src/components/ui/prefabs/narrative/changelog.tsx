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
  variant?: 'primary' | 'flat' | 'responsive'
}

export function Changelog({ title, changes, variant = 'primary' }: ChangelogProps) {
  const content = (
    <List>
      {changes.map((entry, i) => (
        <ChangelogEntry key={i} entry={entry} />
      ))}
    </List>
  )

  if (variant === 'responsive') {
    return (
      <>
        {/* Mobile/Accordion: Flat view */}
        <Card variant="ghost" padding="md" md={{ display: 'none' }}>
          <Card.Content>{content}</Card.Content>
        </Card>

        {/* Desktop: Primary card view */}
        <Card variant="primary" padding="md" display="none" md={{ display: 'flex' }}>
          <Card.Header>
            <Card.Title icon={<ScrollIcon />}>{title}</Card.Title>
          </Card.Header>
          <Card.Content>{content}</Card.Content>
        </Card>
      </>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <Card variant={isFlat ? 'ghost' : 'primary'} padding="md">
      {!isFlat && (
        <Card.Header>
          <Card.Title icon={<ScrollIcon />}>{title}</Card.Title>
        </Card.Header>
      )}

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
