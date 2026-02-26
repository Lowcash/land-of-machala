'use client'

import { type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/core/button'
import { VStack } from '@/components/ui/core/stack'
import { Icon } from '@/components/ui/icons'
import { Value } from '@/components/ui/prefabs/typography/shared'

interface SelectionItemProps {
  name: string
  icon: LucideIcon
  isSelected: boolean
  onClick: () => void
}

export function SelectionItem({ name, icon: SimpleIcon, isSelected, onClick }: SelectionItemProps) {
  return (
    <Button variant={isSelected ? 'primary' : 'choice'} onClick={onClick} fullWidth size="feature">
      <VStack align="center" gap="xxs" fullWidth minWidth="zero">
        <Icon icon={SimpleIcon} size="md" color={isSelected ? 'primary' : 'secondary'} />
        <Value variant="small" color={isSelected ? 'primary' : 'ivory'} align="center" truncate>
          {name}
        </Value>
      </VStack>
    </Button>
  )
}
