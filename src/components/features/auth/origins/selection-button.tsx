'use client'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'
import { Icon } from '@/components/ui/icons'
import { Value } from '@/components/ui/prefabs/typography/shared'

interface SelectionButtonProps {
  name: string
  icon: React.ElementType
  isSelected: boolean
  onClick: () => void
}

export function SelectionButton({
  name,
  icon: PassedIcon,
  isSelected,
  onClick,
}: SelectionButtonProps) {
  return (
    <Button variant={isSelected ? 'primary' : 'choice'} onClick={onClick} fullWidth size="feature">
      <VStack align="center" gap="xxs" fullWidth minWidth="zero">
        <Icon icon={PassedIcon as any} size="md" color={isSelected ? 'primary' : 'secondary'} />
        <Value variant="small" color={isSelected ? 'primary' : 'ivory'} align="center" truncate>
          {name}
        </Value>
      </VStack>
    </Button>
  )
}
