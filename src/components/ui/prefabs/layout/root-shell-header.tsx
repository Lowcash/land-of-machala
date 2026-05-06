import { SITE_APP_NAME } from '@/lib/site-config'

import { BrandWordmark } from '@/components/ui/core/typography'
import { RootShellFrame } from '@/components/ui/prefabs/layout/root-shell-frame'

export function RootShellHeader() {
  return (
    <RootShellFrame as="header">
      <BrandWordmark>{SITE_APP_NAME}</BrandWordmark>
    </RootShellFrame>
  )
}
