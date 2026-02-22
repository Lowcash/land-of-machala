import { Progress } from '@/components/ui/core/progress'
import { HStack, VStack } from '@/components/ui/core/stack'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

export interface VitalsBarProps {
  label: string
  current: number
  max: number
  type: 'hp' | 'mana' | 'energy' | 'xp' | 'gold'
  size?: 'sm' | 'md'
  showValue?: boolean
  compact?: boolean
  sm?: Partial<Omit<VitalsBarProps, 'sm' | 'md' | 'lg' | 'xl' | 'label' | 'type'>>
}

export function VitalsBar({
  label,
  current,
  max,
  type,
  size = 'md',
  showValue = true,
  compact = false,
  sm,
}: VitalsBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100))
  const textColor = type === 'hp' ? 'hp' : type === 'mana' ? 'mana' : 'ivory'

  // Basic responsive merge (can be expanded to md/lg/xl if needed)
  const isCompact = sm?.compact !== undefined ? sm.compact : compact
  const currentSize = sm?.size || size
  const shouldShowValue = sm?.showValue !== undefined ? sm.showValue : showValue

  return (
    <VStack gap="none" fullWidth>
      {!isCompact && shouldShowValue && (
        <HStack align="center" justify="between" fullWidth px="xs">
          <Label variant="tiny" color="secondary">
            {label}
          </Label>
          <HStack align="baseline" gap="xxs" flex="none">
            <Value variant="tiny" color={textColor} tabularNums bold>
              {Math.round(current)}
            </Value>
            <Value variant="tiny" color="secondary" opacity="50">
              /
            </Value>
            <Value variant="tiny" color="secondary" tabularNums>
              {Math.round(max)}
            </Value>
          </HStack>
        </HStack>
      )}
      <Progress
        value={percentage}
        variant={type}
        size={currentSize}
      />
    </VStack>
  )
}
