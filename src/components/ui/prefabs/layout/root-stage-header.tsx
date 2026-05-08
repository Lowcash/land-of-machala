import { SITE_APP_NAME } from '@/lib/site-config'

import { BrandWordmark } from '@/components/ui/core/typography'
import { RootStageFrame } from '@/components/ui/prefabs/layout/root-stage-frame'

export function RootStageHeader() {
  return (
    <RootStageFrame as="header">
      <BrandWordmark>{SITE_APP_NAME}</BrandWordmark>
    </RootStageFrame>
  )
}
