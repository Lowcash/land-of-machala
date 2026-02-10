import { HStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

interface SectionHeaderProps {
  title: string
  icon?: React.ReactNode
}

/**
 * Shared header component for cards and sections.
 * Combines an icon with a fantasy-styled title.
 */
export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <HStack gap="sm" align="center">
      {icon}
      <Text font="fantasy" color="gold" variant="default">
        {title}
      </Text>
    </HStack>
  )
}
