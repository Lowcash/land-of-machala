import { PageLayout } from '@/components/layout/PageLayout'

interface GenericGameLayoutProps {
  header: React.ReactNode
  footer: React.ReactNode
  rightPanel: React.ReactNode
  backgroundImage?: string
  topContent?: React.ReactNode
  bottomContent?: React.ReactNode
}

export function GenericGameLayout({
  header,
  footer,
  rightPanel,
  backgroundImage,
  topContent,
  bottomContent,
}: GenericGameLayoutProps) {
  return (
    <PageLayout
      header={header}
      footer={footer}
      rightPanel={rightPanel}
      backgroundImage={backgroundImage}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Top Content (Character Box, Stats, etc.) - Always has top padding */}
        {topContent && <div className="w-full max-w-md px-3 pt-3">{topContent}</div>}

        {/* Bottom Content (Actions, Shops, etc.) - Always has bottom padding and fills space */}
        {bottomContent && <div className="relative min-h-0 flex-1 px-3 pb-3">{bottomContent}</div>}
      </div>
    </PageLayout>
  )
}
