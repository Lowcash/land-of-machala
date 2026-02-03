import { Stack } from '@/components/ui/stack'

import { Layout } from './Layout'

interface AuthPageTemplateProps {
  children: React.ReactNode
  sideContent?: React.ReactNode
  backgroundImage?: string
}

export function AuthPageTemplate({
  children,
  sideContent,
  backgroundImage,
}: AuthPageTemplateProps) {
  return (
    <Layout backgroundImage={backgroundImage}>
      <Stack display="grid" gridCols="1-2-lg" gap="xxl" align="center" fullWidth maxW="6xl">
        {/* Primary Content (Forms) */}
        <Stack align="center" fullWidth>
          {children}
        </Stack>

        {/* Side Content (Stats, Changelog, Info - Desktop only) */}
        {sideContent && (
          <Stack display="flex-lg" gap="lg" fullWidth>
            {sideContent}
          </Stack>
        )}
      </Stack>
    </Layout>
  )
}
