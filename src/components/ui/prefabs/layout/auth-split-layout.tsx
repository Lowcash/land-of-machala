import type { ChronicleItem, RealmStat } from '@/lib/auth/demo-data'

import { Box, Stack } from '@/components/ui/core/layout'
import { PageHeadline } from '@/components/ui/core/typography'
import { ChronicleFeed } from '@/components/ui/prefabs/auth/chronicle-feed'
import { RealmStatsGrid } from '@/components/ui/prefabs/auth/realm-stats-grid'
import { RootShell, RootShellFrame } from '@/components/ui/prefabs/layout/root-shell'

type AuthSplitLayoutProps = {
  children: React.ReactNode
  chronicles: ChronicleItem[]
  headline: string
  stats: RealmStat[]
}

export function AuthSplitLayout({ children, chronicles, headline, stats }: AuthSplitLayoutProps) {
  return (
    <RootShell>
      <RootShellFrame
        className="grid flex-1 grid-cols-1 items-center gap-(--space-shell-grid-gap) lg:grid-cols-[1.08fr_0.92fr] lg:gap-(--space-shell-grid-gap-lg)"
        inset="page"
      >
        <PageHeadline className="order-1 lg:hidden" size="mobile">
          {headline}
        </PageHeadline>
        <Stack as="section" className="order-3 lg:order-1" gap="xxl">
          <PageHeadline className="hidden max-w-xl lg:block">{headline}</PageHeadline>
          <ChronicleFeed chronicles={chronicles} />
          <RealmStatsGrid stats={stats} />
        </Stack>
        <Box
          as="section"
          className="order-2 w-full max-w-2xl justify-self-center lg:order-2 lg:max-w-md lg:justify-self-end"
        >
          {children}
        </Box>
      </RootShellFrame>
    </RootShell>
  )
}
