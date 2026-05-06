import type { ChronicleItem, RealmStat } from '@/lib/auth/demo-data'

import { Box, Stack } from '@/components/ui/core/layout'
import { BodyText, PageHeadline } from '@/components/ui/core/typography'
import { ChronicleFeed } from '@/components/ui/prefabs/auth/chronicle-feed'
import { RealmStatsGrid } from '@/components/ui/prefabs/auth/realm-stats-grid'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

type AuthSplitLayoutProps = {
  children: React.ReactNode
  chronicles: ChronicleItem[]
  headline: string
  stats: RealmStat[]
  tagline?: string
}

export function AuthSplitLayout({
  children,
  chronicles,
  headline,
  stats,
  tagline,
}: AuthSplitLayoutProps) {
  return (
    <RootShell>
      <RootShell.Frame preset="split">
        <Stack className="order-1 lg:hidden">
          <PageHeadline>{headline}</PageHeadline>
          {tagline ? <BodyText tone="muted">{tagline}</BodyText> : null}
        </Stack>
        <Stack as="section" className="order-3 lg:order-1">
          <div className="hidden max-w-xl lg:block">
            <PageHeadline>{headline}</PageHeadline>
          </div>
          <ChronicleFeed chronicles={chronicles} />
          <RealmStatsGrid stats={stats} />
        </Stack>
        <Box
          as="section"
          className="order-2 w-full max-w-xl justify-self-center lg:order-2 lg:max-w-md lg:justify-self-end"
        >
          {children}
        </Box>
      </RootShell.Frame>
    </RootShell>
  )
}
