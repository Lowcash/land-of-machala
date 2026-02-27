import { Badge } from '@/components/ui/core/badge'
import { Stack } from '@/components/ui/core/stack'

import { Avatar, type AvatarSize } from './avatar'

export interface PortraitProps {
  name: string
  image?: string
  level: number
  size?: AvatarSize
  isEnemy?: boolean
}

/**
 * A semantic prefab for character portraits.
 * Combines the Avatar with a Level Badge in a standardized absolute position.
 */
export function Portrait({ name, image, level, size = 'avatar', isEnemy = false }: PortraitProps) {
  const isCompact = size === 'avatar-xs'

  return (
    <Stack position="relative">
      <Avatar image={image} name={name} size={size} />
      <Stack position="absolute" inset={isCompact ? 'xs' : 'base'} rounded="full">
        <Badge size={isCompact ? 'sm' : 'md'} variant={isEnemy ? 'danger' : 'primary'}>
          {level}
        </Badge>
      </Stack>
    </Stack>
  )
}
