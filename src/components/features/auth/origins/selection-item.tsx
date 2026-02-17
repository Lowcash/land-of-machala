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
      <VStack align="center" gap="xs" fullWidth minWidth="zero">
        <Icon icon={SimpleIcon} size="md" color={isSelected ? 'primary' : 'secondary'} />
        <Text
          variant={isSelected ? 'fantasy-value' : 'small'}
          font="fantasy"
          color={isSelected ? 'primary' : 'secondary'}
          align="center"
          className="w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_4px,black_calc(100%-4px),transparent_100%)] px-1 whitespace-nowrap md:overflow-visible md:mask-none"
        >
          {name}
        </Text>
      </VStack>
    </Button>
  )
}
