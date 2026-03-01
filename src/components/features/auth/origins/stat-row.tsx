import { type LucideIcon } from 'lucide-react'

import { HStack, VStack } from '@/components/ui/core/stack'
import { Icon, type IconColor } from '@/components/ui/icons'
import { Description, Label, Value } from '@/components/ui/prefabs/typography/shared'

interface StatRowProps {
  icon: LucideIcon
  label: string
  value: string | number
  color?: IconColor
  variant?: 'compact' | 'large'
  description?: string
}

export function StatRow({
  icon: SimpleIcon,
  label,
  value,
  color,
  variant = 'compact',
  description,
}: StatRowProps) {
  const content = (
    <VStack gap="none" fullWidth>
      <HStack align="center" gap={variant === 'compact' ? 'xs' : 'sm'}>
        <Icon icon={SimpleIcon} size={variant === 'compact' ? 'xs' : 'sm'} color={color} />
        {variant === 'compact' ? (
          <Value variant="tiny" color="secondary" tabularNums>
            {value} {label}
          </Value>
        ) : (
          <>
            <Value variant="fantasy-value" color={color} tabularNums>
              {value}
            </Value>
            <Label color="secondary" truncate>
              {label}
            </Label>
          </>
        )}
      </HStack>
      {description && (
        <Description variant="bonus" px={variant === 'compact' ? 'sm' : 'md'}>
          {description}
        </Description>
      )}
    </VStack>
  )

  return content
}
