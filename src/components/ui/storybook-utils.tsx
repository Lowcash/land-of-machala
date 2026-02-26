import { VStack } from '@/components/ui/core/stack'

export interface StoryContainerProps {
  children: React.ReactNode
}

/**
 * A smart, standard container for Storybook stories that need a specific width
 * and defined height. This ensures they don't collapse in 'centered' layout.
 */
export function StoryContainer({ children }: StoryContainerProps) {
  return (
    <VStack height="selection" maxWidth="sm" mx="auto" align="stretch" justify="center" p="lg" gap="md">
      {children}
    </VStack>
  )
}
