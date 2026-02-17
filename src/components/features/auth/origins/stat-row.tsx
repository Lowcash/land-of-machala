import { type LucideIcon } from 'lucide-react'

import { HStack } from '@/components/ui/core/stack'
import { Icon, type IconColor } from '@/components/ui/icons'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

interface StatRowProps {
  icon: LucideIcon
  label: string
  value: string | number
  color?: IconColor
  compact?: boolean
}

export function StatRow({ icon: SimpleIcon, label, value, color, compact = false }: StatRowProps) {
  if (compact) {
    return (
      <HStack align="center" gap="xs">
        <Icon icon={SimpleIcon} size="xs" color={color} />
        <Value variant="tiny" color="secondary">
          {value} {label}
        </Value>
      </HStack>
    )
  }

  return (
    <HStack align="center" justify="between" fullWidth gap="sm">
      <HStack align="center" gap="sm" flex="1" minWidth="zero">
        <Icon icon={SimpleIcon} size="sm" color={color} />
        <Label color="secondary" truncate>
          {label}
        </Label>
      </HStack>
      <Value variant="small" color={color as any} shrink>
        {value}
      </Value>
    </HStack>
  )
}
