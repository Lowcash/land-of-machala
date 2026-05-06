import clsx from 'clsx'

import type { RealmStat } from '@/lib/auth/demo-data'

import { Box, Stack } from '@/components/ui/core/layout'
import { DisplayValue, MetaLabel } from '@/components/ui/core/typography'

type RealmStatsGridProps = {
  stats: RealmStat[]
}

export function RealmStatsGrid({ stats }: RealmStatsGridProps) {
  return (
    <ul className={clsx('m-0 grid w-full list-none grid-cols-2 p-0')}>
      {stats.map((item) => (
        <Box as="li" border className="list-none" key={item.label} tone="surface">
          <Stack align="center">
            <MetaLabel>{item.label}</MetaLabel>
            <DisplayValue align="center" tone="primary">
              {item.value}
            </DisplayValue>
          </Stack>
        </Box>
      ))}
    </ul>
  )
}
