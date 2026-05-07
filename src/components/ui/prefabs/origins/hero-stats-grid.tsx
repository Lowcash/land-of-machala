import type { CharacterStats } from '@/lib/auth/demo-data'

import { Box } from '@/components/ui/core/box'
import { Stack } from '@/components/ui/core/layout'
import { DisplayValue, LabelText } from '@/components/ui/core/typography'

type HeroStatsGridProps = {
  stats: CharacterStats
}

type StatCellProps = {
  label: string
  value: number
}

function StatCell({ label, value }: StatCellProps) {
  return (
    <Box as="li" border className="bg-surface-container/60" padding="panel" radius="panel">
      <Stack align="center">
        <LabelText size="meta" tone="default" uppercase>
          {label}
        </LabelText>
        <DisplayValue align="center">{value}</DisplayValue>
      </Stack>
    </Box>
  )
}

export function HeroStatsGrid({ stats }: HeroStatsGridProps) {
  return (
    <ul className="m-0 grid grid-cols-2 list-none p-0 md:grid-cols-3 xl:grid-cols-2">
      <StatCell label="HP" value={stats.hp} />
      <StatCell label="Mana" value={stats.mana} />
      <StatCell label="Strength" value={stats.strength} />
      <StatCell label="Intelligence" value={stats.intelligence} />
      <StatCell label="Agility" value={stats.agility} />
      <StatCell label="Stamina" value={stats.stamina} />
    </ul>
  )
}
