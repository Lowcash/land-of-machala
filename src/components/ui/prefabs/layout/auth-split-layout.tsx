import type { ChronicleItem, RealmStat } from '@/lib/auth/demo-data'

import { Box } from '@/components/ui/core/box'
import { Stack } from '@/components/ui/core/layout'
import { BodyText } from '@/components/ui/core/typography'
import { ChronicleFeed } from '@/components/ui/prefabs/auth/chronicle-feed'
import { RealmStatsGrid } from '@/components/ui/prefabs/auth/realm-stats-grid'
import { RootStage } from '@/components/ui/prefabs/layout/root-stage'
import { PageHeadline } from '@/components/ui/prefabs/typography'

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
    <RootStage>
      <RootStage.Frame preset="split">
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
        <Box as="section" className="order-2 justify-self-center lg:order-2 lg:justify-self-end">
          {children}
        </Box>
      </RootStage.Frame>
    </RootStage>
  )
}
