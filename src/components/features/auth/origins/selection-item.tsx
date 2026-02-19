'use client'

import { type LucideIcon } from 'lucide-react'

import { MotionStack } from '@/components/ui/core/animations/motion-stack'
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
      <VStack align="center" gap="xs" fullWidth minWidth="zero">
        <Icon icon={SimpleIcon} size="md" color={isSelected ? 'primary' : 'secondary'} />
        <MotionStack layout fullWidth px="xs">
          <Text
            variant={isSelected ? 'fantasy-value' : 'small'}
            font="fantasy"
            color={isSelected ? 'primary' : 'secondary'}
            align="center"
            truncate
          >
            {name}
          </Text>
        </MotionStack>
      </VStack>
    </Button>
  )
}
