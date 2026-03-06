import { cn } from '@/lib/utils'
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
  autoCompact?: boolean
  unstyled?: boolean
}

/**
 * A standardized prefab for displaying a horizontal strip of stats.
 * Encapsulates the grid layout, tooltips, and typography rules.
 */
export function StatGrid({
  items,
  compact = false,
  autoCompact = false,
  unstyled = false,
}: StatGridProps) {
  if (items.length === 0) return null

  const content = (
    <HStack
      mode="grid"
      cols={String(items.length) as any}
      gap={compact ? 'none' : 'xs'}
      fullWidth
      justify="center"
      p={compact ? 'xxs' : 'xs'}
      md={autoCompact ? { p: 'xs', gap: 'sm' } : { gap: 'sm' }}
    >
      {items.map((stat) => (
        <Tooltip key={stat.label} content={stat.label} side="bottom">
          <VStack align="center" justify="center" p="none" minWidth="zero">
            {(autoCompact || !compact) && (
              <Label
                variant="tiny"
                color="secondary"
                bold
                display={autoCompact ? 'none' : 'block'}
                md={autoCompact ? { display: 'block' } : undefined}
              >
                {stat.label}
              </Label>
            )}
            <HStack gap="xxs" align="center" minWidth="zero">
              <Icon
                icon={stat.icon}
                size={compact ? 'xs' : 'stat'}
                color={stat.color}
                md={autoCompact ? { size: 'stat' } : undefined}
                shrink={true}
              />
              <Value
                variant="tiny"
                bold={compact}
                tabularNums
                md={autoCompact ? { bold: false, variant: 'fantasy-value' } : undefined}
                truncate
              >
                {stat.value}
              </Value>
            </HStack>
          </VStack>
        </Tooltip>
      ))}
    </HStack>
  )

  if (unstyled) return content

  return (
    <InfoPanel p="none" gap="none" fullWidth>
      {content}
    </InfoPanel>
  )
}
