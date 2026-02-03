import { PageLayout } from '@/components/layout/PageLayout'
import { VStack } from '@/components/ui/stack'

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
      showInfoLog={false} // Force vertical stack
      backgroundImage={backgroundImage}
    >
      <VStack flex="1" _internalClassName="min-w-0">
        <VStack gap="md" fullWidth>
          {/* Top Content (Character Box, Stats, etc.) */}
          {topContent && (
            <VStack pt="md" px="md" maxW="md" fullWidth>
              {topContent}
            </VStack>
          )}

          {/* Activity Log - Restored to main flow for balanced look and mobile visibility */}
          {rightPanel && (
            <VStack px="md" fullWidth>
              {rightPanel}
            </VStack>
          )}

          {/* Bottom Content (Actions, Shops, etc.) */}
          {bottomContent && (
            <VStack position="relative" flex="1" px="md" pb="md" _internalClassName="min-h-0">
              {bottomContent}
            </VStack>
          )}
        </VStack>
      </VStack>
    </PageLayout>
  )
}
