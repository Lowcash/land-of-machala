import { VStack } from '@/components/ui/core/stack'

export interface StoryContainerProps {
  children: React.ReactNode
}

/**
 * A standard container for Storybook stories. Provides a constrained, centered
 * width with a defined height so components render at a realistic preview size.
 * Requires Storybook layout: 'padded' or 'fullscreen' to work correctly
 * (the 'centered' layout strips the width basis, breaking w-full/max-w-*).
 */
export function StoryContainer({ children }: StoryContainerProps) {
  return (
    <VStack minHeight="screen" fullWidth align="center" justify="center">
      <VStack
        fullWidth
        maxWidth="sm"
        align="stretch"
        justify="center"
        p="sm"
        md={{ p: 'lg' }}
        gap="md"
      >
        {children}
      </VStack>
    </VStack>
  )
}
