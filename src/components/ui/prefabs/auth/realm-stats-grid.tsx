import type { RealmStat } from '@/lib/auth/demo-data'

import { Box, Stack } from '@/components/ui/core/layout'
import { DisplayValue, MetaLabel } from '@/components/ui/core/typography'

type RealmStatsGridProps = {
  stats: RealmStat[]
}

export function RealmStatsGrid({ stats }: RealmStatsGridProps) {
  return (
    <ul className="grid w-full grid-cols-2 gap-(--space-stack-lg)">
      {stats.map((item) => (
        <li key={item.label}>
          <Box border className="text-center" padding="md" radius="xl" tone="surface">
            <Stack gap="sm">
              <DisplayValue align="center" size="xl" tone="primary">
                {item.value}
              </DisplayValue>
              <MetaLabel>{item.label}</MetaLabel>
            </Stack>
          </Box>
        </li>
      ))}
    </ul>
  )
}
