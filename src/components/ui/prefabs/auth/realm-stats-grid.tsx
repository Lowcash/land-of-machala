import type { RealmStat } from '@/lib/auth/demo-data'

import { Box } from '@/components/ui/core/box'
import { Grid, Stack } from '@/components/ui/core/layout'
import { DisplayValue, LabelText } from '@/components/ui/core/typography'

type RealmStatsGridProps = {
  stats: RealmStat[]
}

export function RealmStatsGrid({ stats }: RealmStatsGridProps) {
  return (
    <Grid as="ul" columns={2} fullWidth>
      {stats.map((item) => (
        <Box as="li" border key={item.label} padding="item" radius="compact" tone="surface">
          <Stack align="start">
            <LabelText size="label" tone="inherit" uppercase>
              <span className="text-primary-bright">{item.label}</span>
            </LabelText>
            <DisplayValue align="left" size="heading" tone="default">
              {item.value}
            </DisplayValue>
          </Stack>
        </Box>
      ))}
    </Grid>
  )
}
