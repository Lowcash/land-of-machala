'use client'

import { motion } from 'framer-motion'
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
    <Button
      variant={isSelected ? 'primary' : 'choice'}
      onClick={onClick}
      fullWidth
      size="feature"
    >
      <VStack align="center" gap="xs" fullWidth minWidth="zero">
        <Icon icon={SimpleIcon} size="md" color={isSelected ? 'primary' : 'secondary'} />
        <motion.div layout className="w-full truncate px-1">
          <Text
            variant={isSelected ? 'fantasy-value' : 'small'}
            font="fantasy"
            color={isSelected ? 'primary' : 'secondary'}
            align="center"
            className="text-sm"
          >
            {name}
          </Text>
        </motion.div>
      </VStack>
    </Button>
  )
}
