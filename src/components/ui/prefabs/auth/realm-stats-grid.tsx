import clsx from 'clsx'

import type { RealmStat } from '@/lib/auth/demo-data'

import { Box } from '@/components/ui/core/box'
import { Stack } from '@/components/ui/core/layout'
import { DisplayValue, LabelText } from '@/components/ui/core/typography'

type RealmStatsGridProps = {
  stats: RealmStat[]
}

export function RealmStatsGrid({ stats }: RealmStatsGridProps) {
  return (
    <ul className={clsx('m-0 grid w-full list-none grid-cols-2 p-0')}>
      {stats.map((item) => (
        <Box
          as="li"
          border
          className="list-none"
          key={item.label}
          padding="panel"
          radius="panel"
          tone="surface"
        >
          <Stack align="center">
            <LabelText size="meta" tone="default" uppercase>
              {item.label}
            </LabelText>
            <DisplayValue align="center" tone="primary">
              {item.value}
            </DisplayValue>
          </Stack>
        </Box>
      ))}
    </ul>
  )
}
