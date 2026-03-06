import { Box } from '@/components/ui/core/box'
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
  autoCompact?: boolean
  invisible?: boolean
}

export function VitalsBar({
  label,
  value,
  max,
  variant,
  showText = true,
  compact = false,
  autoCompact = false,
  invisible = false,
}: VitalsBarProps) {
  const textColor = variant === 'hp' ? 'hp' : variant === 'mana' ? 'mana' : 'ivory'

  return (
    <VStack gap="xxs" fullWidth invisible={invisible} pointerEvents={invisible ? 'none' : 'auto'}>
      {(autoCompact || !compact) && (
        <Label
          variant="tiny"
          color="secondary"
          align="left"
          px="xxs"
          display={autoCompact ? 'none' : 'block'}
          md={autoCompact ? { display: 'block' } : undefined}
        >
          {label}
        </Label>
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
          md={autoCompact || !compact ? { size: 'lg' } : undefined}
        >
          {showText && (autoCompact || !compact) && (
            <Box
              display={autoCompact ? 'none' : 'block'}
              md={autoCompact ? { display: 'block' } : undefined}
              fullWidth
            >
              <HStack align="center" justify="center" gap="xxs" fullWidth>
                <Value variant="tiny" color="ivory" bold tabularNums>
                  {Math.round(value)}
                </Value>
                <Value variant="tiny" color="secondary" italic>
                  /
                </Value>
                <Value variant="tiny" color="secondary" tabularNums>
                  {max}
                </Value>
              </HStack>
            </Box>
          )}
        </Progress>
      </Tooltip>
    </VStack>
  )
}
