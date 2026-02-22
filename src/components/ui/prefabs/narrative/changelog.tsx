import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { ScrollIcon } from '@/components/ui/icons'
import { Description, MutedText } from '@/components/ui/prefabs/typography/shared'

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
        <Card variant="ghost" p="md" md={{ display: 'none' }}>
          <Card.Content>{content}</Card.Content>
        </Card>

        {/* Desktop: Primary card view */}
        <Card variant="secondary" p="md" display="none" md={{ p: 'lg', display: 'flex' }}>
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
    <Card variant={isFlat ? 'ghost' : 'secondary'} p="md" md={{ p: 'lg' }}>
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
          <Description as="span" color={entry.color} bold>
            {entry.category}:{' '}
          </Description>
        )}
        {entry.description}
      </MutedText>
    </ListItem>
  )
}
