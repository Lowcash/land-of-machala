import { Progress, type ProgressProps } from '@/components/ui/core/progress'
import { HStack, VStack } from '@/components/ui/core/stack'
import { Tooltip } from '@/components/ui/core/tooltip'
import { Label, Value } from '@/components/ui/prefabs/typography/shared'

interface VitalsBarProps {
  label: string
  value: number
  max: number
  variant: 'hp' | 'mana' | 'energy' | 'xp' | 'gold'
  showText?: boolean
  compact?: boolean
}

export function VitalsBar({
  label,
  value,
  max,
  variant,
  showText = true,
  compact = false,
}: VitalsBarProps) {
  const textColor = variant === 'hp' ? 'hp' : variant === 'mana' ? 'mana' : 'ivory'

  return (
    <VStack gap="xs" fullWidth>
      {!compact && (
        <HStack align="center" justify="between" fullWidth px="xs">
          <Label variant="tiny" color="secondary">
            {label}
          </Label>
          {showText && (
            <HStack align="baseline" gap="xs" flex="none">
              <Value variant="tiny" color={textColor} tabularNums>
                {Math.round(value)}
              </Value>
              <Value variant="tiny" color="secondary">
                /
              </Value>
              <Value variant="tiny" color="secondary" tabularNums>
                {max}
              </Value>
            </HStack>
          )}
        </HStack>
      )}
      <Tooltip
        content={
          <HStack align="baseline" gap="xs">
            <Value variant="tiny" color={textColor}>
              {Math.round(value)}
            </Value>
            <Value variant="tiny" color="secondary">
              /
            </Value>
            <Value variant="tiny" color="secondary">
              {max}
            </Value>
          </HStack>
        }
        side="top"
        align="center"
      >
        <Progress
          value={value}
          max={max}
          variant={variant as ProgressProps['variant']}
          size={compact ? 'sm' : 'md'}
        />
      </Tooltip>
    </VStack>
  )
}
