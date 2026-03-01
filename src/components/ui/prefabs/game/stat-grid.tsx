import { HStack, VStack } from '@/components/ui/core/stack'
import { Tooltip } from '@/components/ui/core/tooltip'
import { Icon, type IconColor } from '@/components/ui/icons'
import { InfoPanel } from '@/components/ui/prefabs/structure'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

export interface StatItem {
  icon: import('lucide-react').LucideIcon
  label: string
  value: string | number
  color: IconColor
}

export interface StatGridProps {
  items: StatItem[]
  compact?: boolean
}

/**
 * A standardized prefab for displaying a horizontal strip of stats.
 * Encapsulates the grid layout, tooltips, and typography rules.
 */
export function StatGrid({ items, compact = false }: StatGridProps) {
  if (items.length === 0) return null

  return (
    <InfoPanel p="none" gap="none" fullWidth>
      <HStack
        display="grid"
        cols={String(items.length) as any}
        gap="none"
        fullWidth
        py={compact ? 'xxs' : 'xs'}
      >
        {items.map((stat) => (
          <Tooltip key={stat.label} content={stat.label} side="bottom">
            <VStack align="center" justify="center" p="none" minWidth="zero">
              {!compact && (
                <Label variant="tiny" color="secondary">
                  {stat.label}
                </Label>
              )}
              <HStack gap="xxs" align="center">
                <Icon icon={stat.icon} size={compact ? 'xs' : 'stat'} color={stat.color} />
                <Value variant="tiny" bold={compact} tabularNums>
                  {stat.value}
                </Value>
              </HStack>
            </VStack>
          </Tooltip>
        ))}
      </HStack>
    </InfoPanel>
  )
}
