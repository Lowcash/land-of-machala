import { type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { Icon } from '@/components/ui/icons'

interface SelectionItemProps {
  name: string
  icon: LucideIcon
  isSelected: boolean
  onClick: () => void
}

export function SelectionItem({ name, icon: SimpleIcon, isSelected, onClick }: SelectionItemProps) {
  return (
    <Button variant={isSelected ? 'primary' : 'choice'} onClick={onClick} fullWidth size="feature">
      <VStack align="center" gap="xs">
        <Icon icon={SimpleIcon} size="md" color={isSelected ? 'gold' : 'secondary'} />
        <Text font="fantasy" variant="small" color={isSelected ? 'gold' : 'secondary'}>
          {name}
        </Text>
      </VStack>
    </Button>
  )
}
