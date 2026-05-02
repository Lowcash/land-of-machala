import type { RealmStat } from '@/lib/auth/demo-data'

import { DisplayValue, MetaLabel } from '@/components/ui/core/typography'

type RealmStatsGridProps = {
  stats: RealmStat[]
}

export function RealmStatsGrid({ stats }: RealmStatsGridProps) {
  return (
    <ul className="grid w-full grid-cols-2 gap-4">
      {stats.map((item) => (
        <li key={item.label}>
          <div className="bg-surface-container/40 border-outline-variant/30 space-y-1 rounded-xl border p-4 text-center">
            <DisplayValue align="center" size="xl" tone="primary">
              {item.value}
            </DisplayValue>
            <MetaLabel>{item.label}</MetaLabel>
          </div>
        </li>
      ))}
    </ul>
  )
}
