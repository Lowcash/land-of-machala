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
  variant?: 'primary' | 'flat' | 'responsive'
}

export function Stats({ title, stats, variant = 'primary' }: StatsProps) {
  const content = (
    <Stack display="grid" cols="2" gap="md">
      {stats.map((stat) => (
        <StatBlock key={stat.id} stat={stat} />
      ))}
    </Stack>
  )

  if (variant === 'responsive') {
    return (
      <>
        {/* Mobile/Accordion: Flat view */}
        <Card variant="ghost" p="md" md={{ display: 'none' }}>
          {content}
        </Card>

        {/* Desktop: Primary card view */}
        <Card variant="secondary" p="md" display="none" md={{ p: 'lg', display: 'flex' }}>
          <Card.Header>
            <Card.Title icon={<UsersIcon />}>{title}</Card.Title>
          </Card.Header>
          {content}
        </Card>
      </>
    )
  }

  const isFlat = variant === 'flat'

  return (
    <Card variant={isFlat ? 'ghost' : 'secondary'} p="md" md={{ p: 'lg' }}>
      {!isFlat && (
        <Card.Header>
          <Card.Title icon={<UsersIcon />}>{title}</Card.Title>
        </Card.Header>
      )}

      {content}
    </Card>
  )
}

function StatBlock({ stat }: { stat: TranslatedServerStat }) {
  return (
    <Card variant="subtle" padding="md" gap="xs">
      <MutedText>{stat.label}</MutedText>
      <Value color={stat.color}>{stat.value}</Value>
    </Card>
  )
}
