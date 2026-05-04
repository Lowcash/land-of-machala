import { SITE_APP_NAME } from '@/lib/site-config'

import { BrandWordmark } from '@/components/ui/core/typography'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

export function RootShellHeader() {
  return (
    <RootShell.Frame as="header" inset="band">
      <BrandWordmark>{SITE_APP_NAME}</BrandWordmark>
    </RootShell.Frame>
  )
}
