import { type LucideIcon } from 'lucide-react'

import { HStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'
import { Decoration, Value } from '@/components/ui/prefabs/typography/shared'

interface StatRowProps {
  icon: LucideIcon
  label: string
  value: string | number
  iconColor?: string
  labelColor?: string
  valueColor?: string
  compact?: boolean
}

export function StatRow({ 
  icon: Icon, 
  label, 
  value,
  iconColor,
  labelColor,
  valueColor,
  compact = false
}: StatRowProps) {
  if (compact) {
    return (
      <HStack align="center" gap="xs">
        <Icon 
          size={10} 
          style={iconColor ? { color: iconColor } : undefined} 
        />
        <Text 
          variant="small"
          style={labelColor ? { color: labelColor } : undefined}
          className="text-[9px] sm:text-[10px]"
        >
          {value} {label}
        </Text>
      </HStack>
    )
  }

  return (
    <HStack align="center" justify="between" fullWidth>
      <HStack align="center" gap="sm">
        <Icon 
          size={14} 
          style={iconColor ? { color: iconColor } : undefined} 
        />
        <Decoration style={labelColor ? { color: labelColor } : undefined}>
          {label}
        </Decoration>
      </HStack>
      <Value 
        variant="small" 
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </Value>
    </HStack>
  )
}
