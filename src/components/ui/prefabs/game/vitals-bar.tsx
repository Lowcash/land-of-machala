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
        <VStack px="xs" fullWidth>
          <Label variant="tiny" color="secondary" align="left">
            {label}
          </Label>
        </VStack>
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
          size={compact ? 'sm' : 'lg'}
        >
          {showText && !compact && (
            <HStack align="baseline" gap="xxs">
              <Value variant="tiny" color="primary" tabularNums>
                {Math.round(value)}
              </Value>
              <Value variant="tiny" color="primary">
                /
              </Value>
              <Value variant="tiny" color="primary" tabularNums>
                {max}
              </Value>
            </HStack>
          )}
        </Progress>
      </Tooltip>
    </VStack>
  )
}
