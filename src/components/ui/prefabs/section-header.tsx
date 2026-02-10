import { HStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

interface SectionHeaderProps {
  title: string
  icon?: React.ReactNode
}

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
