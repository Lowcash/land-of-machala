import type { CharacterStats } from '@/lib/auth/demo-data'

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
    <div className="border-outline-variant/40 bg-surface-container/60 rounded-xl border p-3 text-center">
      <MetaLabel>{label}</MetaLabel>
      <DisplayValue align="center" size="xl">
        {value}
      </DisplayValue>
    </div>
  )
}

export function HeroStatsGrid({ stats }: HeroStatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <StatCell label="HP" value={stats.hp} />
      <StatCell label="Mana" value={stats.mana} />
      <StatCell label="Strength" value={stats.strength} />
      <StatCell label="Intelligence" value={stats.intelligence} />
      <StatCell label="Agility" value={stats.agility} />
      <StatCell label="Stamina" value={stats.stamina} />
    </div>
  )
}
