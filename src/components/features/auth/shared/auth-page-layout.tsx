import { Stack } from '@/components/ui/core/stack'

interface AuthPageLayoutProps {
  children: React.ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <Stack fullWidth minHeight="dvh" justify="center" align="center" p="lg">
      <Stack fullWidth maxWidth="5xl">
        {children}
      </Stack>
    </Stack>
  )
}
