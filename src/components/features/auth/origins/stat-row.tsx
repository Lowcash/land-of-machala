import { type LucideIcon } from 'lucide-react'

import { HStack } from '@/components/ui/core/stack'
import { Icon, type IconColor } from '@/components/ui/icons'
import { Decoration, Value } from '@/components/ui/prefabs/typography/shared'

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
        <Value variant="small" color="secondary">
          {value} {label}
        </Value>
      </HStack>
    )
  }

  return (
    <HStack align="center" justify="between" fullWidth>
      <HStack align="center" gap="sm">
        <Icon icon={SimpleIcon} size="sm" color={color} />
        <Decoration color="secondary">{label}</Decoration>
      </HStack>
      <Value variant="small" color={color as any}>
        {value}
      </Value>
    </HStack>
  )
}
