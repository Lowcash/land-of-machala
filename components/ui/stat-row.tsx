import * as React from 'react'

import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Card } from './card'
import { DetailRow } from './display'
import { HStack } from './stack'
import type { TypographyProps } from './typography'
import { Span } from './typography'

interface StatRowProps {
  label: string
  value: string | number
  icon?: LucideIcon
  iconColor?: string
  valueColor?: TypographyProps['color']
  suffix?: string
  extra?: React.ReactNode
}

export function StatRow({
  label,
  value,
  icon: Icon,
  iconColor,
  valueColor = 'gold',
  suffix = '',
  extra,
}: StatRowProps) {
  return (
    <Card variant="muted" fullWidth>
      <Card.Content>
        <DetailRow
          px="md"
          py="xs"
          label={
            <HStack gap="sm" align="center">
              {Icon && <Icon className={cn('h-4 w-4', iconColor)} />}
              {label}
            </HStack>
          }
          value={
            <HStack gap="sm" align="center">
              <Span font="fantasy" color={valueColor}>
                {value}
                {suffix}
              </Span>
              {extra}
            </HStack>
          }
        />
      </Card.Content>
    </Card>
  )
}
