import type { RealmStat } from '@/lib/auth/demo-data'

import { DisplayValue, MetaLabel } from '@/components/ui/core/typography'

type RealmStatsGridProps = {
  stats: RealmStat[]
}

export function RealmStatsGrid({ stats }: RealmStatsGridProps) {
  return (
    <ul className="grid w-full grid-cols-2 gap-(--space-stack-lg)">
      {stats.map((item) => (
        <li
          key={item.label}
          className="flex flex-col items-center gap-(--space-stack-sm) rounded-xl border border-outline-variant/40 bg-surface-container/40 p-(--space-pad-md) text-center"
        >
          <MetaLabel>{item.label}</MetaLabel>
          <DisplayValue align="center" size="xl" tone="primary">
            {item.value}
          </DisplayValue>
        </li>
      ))}
    </ul>
  )
}
