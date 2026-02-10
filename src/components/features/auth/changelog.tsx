import { LATEST_CHANGES } from '@/lib/game/constants/changelog'
import { ChangelogEntry as ChangelogData } from '@/lib/game/constants/changelog'

import { Card } from '@/components/ui/core/card'
import { List, ListItem } from '@/components/ui/core/list'
import { Text } from '@/components/ui/core/typography'
import { ScrollIcon } from '@/components/ui/icons'
import { SectionHeader } from '@/components/ui/shared/section-header'

export function Changelog() {
  return (
    <Card variant="primary" padding="lg" gap="md">
      <SectionHeader title="Nejnovější změny" icon={<ScrollIcon />} />

      <List>
        {LATEST_CHANGES.map((entry, index) => (
          <ChangelogEntry key={index} entry={entry} />
        ))}
      </List>
    </Card>
  )
}

function ChangelogEntry({ entry }: { entry: ChangelogData }) {
  return (
    <ListItem>
      <Text variant="small" color="primary">
        {entry.category && (
          <Text as="span" variant="small" color={entry.color as any}>
            {entry.category}:{' '}
          </Text>
        )}
        {entry.description}
      </Text>
    </ListItem>
  )
}
