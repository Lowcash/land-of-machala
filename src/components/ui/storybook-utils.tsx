import { type BoxProps } from '@/components/ui/core/box'
import { VStack } from '@/components/ui/core/stack'

export interface StoryContainerProps {
  children: React.ReactNode
  width?: BoxProps['maxWidth']
  p?: BoxProps['p']
}

/**
 * A standard container for Storybook stories that need a specific width
 * and optional defined height. This ensures they don't collapse
 * in 'centered' layout while remaining responsive.
 */
export function StoryContainer({ children, width = 'md', p = 'xl' }: StoryContainerProps) {
  return (
    <VStack align="stretch" justify="center" p={p} gap="md" fullWidth maxWidth={width}>
      {children}
    </VStack>
  )
}
