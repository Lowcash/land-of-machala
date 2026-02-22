import { Stack } from '@/components/ui/core/stack'

interface AuthPageLayoutProps {
  children: React.ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <Stack fullWidth flex="1" justify="center" align="center" p="md" sm={{ p: 'lg' }} overflow="auto">
      <Stack fullWidth maxWidth="5xl" py="lg" sm={{ py: 'xl' }}>
        {children}
      </Stack>
    </Stack>
  )
}
