import { SITE_APP_NAME } from '@/lib/site-config'

import { BrandWordmark } from '@/components/ui/core/typography'

export function RootShellHeader() {
  return (
    <header className="px-6 py-6 md:px-10 md:py-8">
      <div className="mx-auto w-full max-w-6xl">
        <BrandWordmark>{SITE_APP_NAME}</BrandWordmark>
      </div>
    </header>
  )
}
