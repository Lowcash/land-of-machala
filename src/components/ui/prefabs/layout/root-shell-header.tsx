import { SITE_APP_NAME } from '@/lib/site-config'

import { RootShellFrame } from '@/components/ui/prefabs/layout/root-shell-frame'
import { BrandWordmark } from '@/components/ui/prefabs/typography'

export function RootShellHeader() {
  return (
    <RootShellFrame as="header">
      <BrandWordmark>{SITE_APP_NAME}</BrandWordmark>
    </RootShellFrame>
  )
}
