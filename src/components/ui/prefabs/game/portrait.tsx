import { cn } from '@/lib/utils'
import { Box } from '@/components/ui/core/box'
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
  const isCompact = size === 'avatar-sm' || size === 'avatar-xs'

  return (
    <Stack position="relative">
      <Avatar image={image} name={name} size={size} />
      <Box
        position="absolute"
        rounded="full"
        inset={isCompact ? 'xs' : 'base'}
        sm={size === 'avatar' ? { inset: 'base' } : { inset: 'xs' }}
        md={size === 'avatar' ? { inset: 'base' } : { inset: 'xs' }}
      >
        <Badge size={isCompact ? 'sm' : 'md'} variant={isEnemy ? 'danger' : 'primary'}>
          {level}
        </Badge>
      </Box>
    </Stack>
  )
}
