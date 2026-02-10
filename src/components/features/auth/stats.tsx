import { SERVER_STATS, ServerStat } from '@/lib/game/constants/stats'

import { Card } from '@/components/ui/core/card'
import { Stack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { UsersIcon } from '@/components/ui/icons'
import { SectionHeader } from '@/components/ui/shared/section-header'

export function Stats() {
  return (
    <Card variant="primary" padding="lg" gap="md">
      <SectionHeader title="Statistiky serveru" icon={<UsersIcon />} />

      <Stack display="grid" cols="2" gap="md">
        {SERVER_STATS.map((stat) => (
          <StatBlock key={stat.label} stat={stat} />
        ))}
      </Stack>
    </Card>
  )
}

function StatBlock({ stat }: { stat: ServerStat }) {
  return (
    <Card variant="subtle" padding="md" gap="xs">
      <Text variant="muted" color="secondary" font="body">
        {stat.label}
      </Text>
      <Text variant="fantasy-value" font="fantasy" color={stat.color}>
        {stat.value}
      </Text>
    </Card>
  )
}
