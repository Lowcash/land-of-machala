import { SITE_APP_NAME } from '@/lib/site-config'

import { RootStageFrame } from '@/components/ui/prefabs/layout/root-stage-frame'
import { BrandWordmark } from '@/components/ui/prefabs/typography'

export function RootStageHeader() {
  return (
    <RootStageFrame as="header">
      <BrandWordmark>{SITE_APP_NAME}</BrandWordmark>
    </RootStageFrame>
  )
}
