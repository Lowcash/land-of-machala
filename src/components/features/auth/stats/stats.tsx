import { type ServerStat } from '@/lib/game/constants/stats'

import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/stack'
import { UsersIcon } from '@/components/ui/icons'
import { MutedText, Value } from '@/components/ui/prefabs/typography/shared'

interface StatsProps {
  stats: ServerStat[]
}

export function Stats({ stats }: StatsProps) {
  return (
    <Card padding="lg">
      <Card.Header>
        <Card.Title icon={<UsersIcon />}>Statistiky serveru</Card.Title>
      </Card.Header>

      <Stack display="grid" cols="2" gap="md">
        {stats.map((stat) => (
          <StatBlock key={stat.label} stat={stat} />
        ))}
      </Stack>
    </Card>
  )
}

function StatBlock({ stat }: { stat: ServerStat }) {
  return (
    <Card variant="subtle" padding="md" gap="xs">
      <MutedText>{stat.label}</MutedText>
      <Value color={stat.color as any}>{stat.value}</Value>
    </Card>
  )
}
