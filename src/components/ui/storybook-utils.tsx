import { cn } from '@/lib/utils'

import { VStack } from '@/components/ui/core/stack'

export type StoryContainerWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface StoryContainerProps {
  children: React.ReactNode
  width?: StoryContainerWidth
  p?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * A standard container for Storybook stories that need a specific width
 * (e.g., Progress, Divider, Alerts). This ensures they don't collapse
 * in 'centered' layout while remaining responsive.
 */
export function StoryContainer({ children, width = 'md', p = 'xl' }: StoryContainerProps) {
  const widthClasses = {
    xs: 'max-w-64',
    sm: 'max-w-80',
    md: 'max-w-[440px]',
    lg: 'max-w-[800px]',
    xl: 'max-w-[1200px]',
    full: 'max-w-full',
  }

  return (
    <VStack
      align="stretch"
      justify="center"
      p={p}
      gap="md"
      fullWidth
      className={cn('min-h-[100px]', widthClasses[width] || widthClasses.md)}
    >
      {children}
    </VStack>
  )
}
