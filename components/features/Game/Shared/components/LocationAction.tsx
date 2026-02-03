import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import { ActionItem } from '@/components/ui/action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameIcon } from '@/components/ui/display'
import { HStack, VStack } from '@/components/ui/stack'
import { Caption, Label } from '@/components/ui/typography'

interface LocationActionProps {
  title: string
  description?: string
  icon: LucideIcon
  onClick?: () => void
  variant?:
    | 'default'
    | 'large'
    | 'compact'
    | 'danger'
    | 'secondary'
    | 'ghost'
    | 'success'
    | 'forest'
    | 'primary'
  disabled?: boolean
  loading?: boolean
  rightElement?: ReactNode
}

export function LocationAction({
  title,
  description,
  icon: Icon,
  onClick,
  variant = 'default',
  disabled,
  loading,
  rightElement,
}: LocationActionProps) {
  if (variant === 'large') {
    return (
      <ActionItem
        label={title}
        subLabel={description}
        icon={Icon}
        onClick={onClick || (() => {})}
        disabled={disabled}
        loading={loading}
        variant="secondary"
        layout="col"
      />
    )
  }

  if (
    variant === 'compact' ||
    variant === 'danger' ||
    variant === 'secondary' ||
    variant === 'ghost'
  ) {
    return (
      <ActionItem
        label={title}
        subLabel={description}
        icon={Icon}
        onClick={onClick || (() => {})}
        disabled={disabled}
        loading={loading}
        variant={variant === 'compact' ? 'secondary' : variant}
        layout="row"
      />
    )
  }

  // Default variant is complex (has children etc.)
  return (
    <Card variant="row">
      <Card.Content disablePadding>
        <HStack align="center" justify="between" fullWidth>
          <HStack align="center" gap="md" p="sm">
            <GameIcon icon={Icon} color="gold" size="lg" rounded="sm" bgOpacity="20" />
            <VStack gap="none">
              <Label color="gold">{title}</Label>
              {description && <Caption color="muted">{description}</Caption>}
            </VStack>
          </HStack>
          <HStack align="center" gap="md" pr="sm" pl="sm">
            {rightElement}
            {onClick && (
              <Button
                variant="secondary_game"
                size="xs"
                onClick={onClick}
                disabled={disabled}
                loading={loading}
                label="Provést"
              />
            )}
          </HStack>
        </HStack>
      </Card.Content>
    </Card>
  )
}
