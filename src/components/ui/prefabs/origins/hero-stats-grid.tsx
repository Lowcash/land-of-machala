import type { CharacterStats } from '@/lib/auth/demo-data'

import { Box } from '@/components/ui/core/layout'
import { DisplayValue, MetaLabel } from '@/components/ui/core/typography'

type HeroStatsGridProps = {
  stats: CharacterStats
}

type StatCellProps = {
  label: string
  value: number
}

function StatCell({ label, value }: StatCellProps) {
  return (
    <Box border className="bg-surface-container/60">
      <MetaLabel>{label}</MetaLabel>
      <DisplayValue align="center">{value}</DisplayValue>
    </Box>
  )
}

export function HeroStatsGrid({ stats }: HeroStatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2">
      <StatCell label="HP" value={stats.hp} />
      <StatCell label="Mana" value={stats.mana} />
      <StatCell label="Strength" value={stats.strength} />
      <StatCell label="Intelligence" value={stats.intelligence} />
      <StatCell label="Agility" value={stats.agility} />
      <StatCell label="Stamina" value={stats.stamina} />
    </div>
  )
}
