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

const AUTH_SPLIT_MOBILE_HEADLINE_CLASS = 'order-1 lg:hidden'
const AUTH_SPLIT_LORE_CLASS = 'order-3 lg:order-1'
const AUTH_SPLIT_FORM_CLASS =
  'order-2 w-full max-w-xl justify-self-center lg:order-2 lg:max-w-[30rem] lg:justify-self-end'

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
        <Stack as="section" className={AUTH_SPLIT_MOBILE_HEADLINE_CLASS}>
          <PageHeadline italic>{headline}</PageHeadline>
          {tagline ? <BodyText tone="muted">{tagline}</BodyText> : null}
        </Stack>
        <Stack as="section" className={AUTH_SPLIT_LORE_CLASS}>
          <Box className="hidden max-w-xl lg:block">
            <PageHeadline italic>{headline}</PageHeadline>
          </Box>
          <ChronicleFeed chronicles={chronicles} />
          <RealmStatsGrid stats={stats} />
        </Stack>
        <Box as="section" className={AUTH_SPLIT_FORM_CLASS}>
          {children}
        </Box>
      </RootStage.Frame>
    </RootStage>
  )
}
