import type { ChronicleItem, RealmStat } from '@/lib/auth/demo-data'

import { Stack } from '@/components/ui/core/layout'
import { PageHeadline } from '@/components/ui/core/typography'
import { ChronicleFeed } from '@/components/ui/prefabs/auth/chronicle-feed'
import { RealmStatsGrid } from '@/components/ui/prefabs/auth/realm-stats-grid'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

type AuthSplitLayoutProps = {
  children: React.ReactNode
  chronicles: ChronicleItem[]
  headline: string
  stats: RealmStat[]
}

export function AuthSplitLayout({ children, chronicles, headline, stats }: AuthSplitLayoutProps) {
  return (
    <RootShell>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <section className="order-1 lg:hidden">
          <PageHeadline size="mobile">{headline}</PageHeadline>
        </section>
        <section className="order-3 lg:order-1">
          <Stack space="8">
            <header className="hidden max-w-xl lg:block">
              <PageHeadline>{headline}</PageHeadline>
            </header>
            <ChronicleFeed chronicles={chronicles} />
            <RealmStatsGrid stats={stats} />
          </Stack>
        </section>
        <section className="order-2 w-full max-w-2xl justify-self-center lg:order-2 lg:max-w-md lg:justify-self-end">
          {children}
        </section>
      </div>
    </RootShell>
  )
}
