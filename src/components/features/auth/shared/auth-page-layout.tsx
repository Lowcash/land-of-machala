import { Stack } from '@/components/ui/core/stack'

interface AuthPageLayoutProps {
  children: React.ReactNode
}

export function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <Stack fullWidth minHeight="dvh" justify="center" align="center" p="xl">
      <Stack fullWidth maxWidth="5xl">
        {children}
      </Stack>
    </Stack>
  )
}
