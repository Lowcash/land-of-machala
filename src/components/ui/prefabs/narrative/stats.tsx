import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/stack'
import { UsersIcon } from '@/components/ui/icons'
import { MutedText, Value } from '@/components/ui/prefabs/typography/shared'

export interface TranslatedServerStat {
  id: string
  label: string
  value: string
  color: 'gold' | 'danger' | 'success' | 'info'
}

interface StatsProps {
  title: string
  stats: TranslatedServerStat[]
  minimal?: boolean
  forceMinimal?: boolean
}

export function Stats({ title, stats, minimal, forceMinimal }: StatsProps) {
  const content = (
    <Stack display="grid" cols="2" gap="md">
      {stats.map((stat) => (
        <StatBlock key={stat.id} stat={stat} />
      ))}
    </Stack>
  )

  if (forceMinimal) {
    return (
      <Card variant="subtle" padding="md">
        {content}
      </Card>
    )
  }

  if (minimal) {
    return (
      <>
        <Card variant="subtle" padding="md" lg={{ display: 'none' }}>
          {content}
        </Card>

        <Card variant="primary" display="none" lg={{ display: 'flex' }} padding="lg">
          <Card.Header>
            <Card.Title icon={<UsersIcon />}>{title}</Card.Title>
          </Card.Header>
          {content}
        </Card>
      </>
    )
  }

  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<UsersIcon />}>{title}</Card.Title>
      </Card.Header>
      {content}
    </Card>
  )
}

function StatBlock({ stat }: { stat: TranslatedServerStat }) {
  return (
    <Card variant="subtle" padding="md" gap="xs">
      <MutedText>{stat.label}</MutedText>
      <Value color={stat.color as any}>{stat.value}</Value>
    </Card>
  )
}
