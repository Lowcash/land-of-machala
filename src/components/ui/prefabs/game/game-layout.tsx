import { VStack, Stack } from '@/components/ui/core/stack'

interface GameLayoutProps {
  children: React.ReactNode
}

/**
 * Standard layout wrapper for game views.
 * Ensures proper spacing, background handling, and responsive alignment.
 */
export function GameLayout({ children }: GameLayoutProps) {
  return (
    <Stack fullWidth minHeight="dvh" justify="center" align="center" p="lg">
      <VStack fullWidth maxWidth="5xl" gap="xl">
        {children}
      </VStack>
    </Stack>
  )
}
