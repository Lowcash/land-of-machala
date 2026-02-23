import Image from 'next/image'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Stack } from '@/components/ui/core/stack'
import { UserIcon } from '@/components/ui/icons'

const avatarImageVariants = cva('object-cover transition-all hover:grayscale-0', {
  variants: {
    variant: {
      default: 'grayscale-20',
      hero: 'grayscale-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface AvatarProps extends VariantProps<typeof avatarImageVariants> {
  image?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'avatar' | 'avatar-sm' | 'avatar-xs' | 'avatar-lg'
  sm?: Partial<Omit<AvatarProps, 'sm' | 'md' | 'lg' | 'xl' | 'name'>>
}

export function Avatar({ image, name, size = 'avatar', variant, sm }: AvatarProps) {
  const currentSize = sm?.size || size
  const currentVariant = sm?.variant || variant
  
  return (
    <Stack
      flex="none"
      width={
        currentSize === 'avatar-lg' || currentSize === 'avatar' || currentSize === 'avatar-sm' || currentSize === 'avatar-xs'
          ? currentSize
          : currentSize === 'lg'
            ? 'avatar-lg'
            : currentSize === 'md'
              ? 'avatar'
              : 'avatar-sm'
      }
      position="relative"
      overflow="hidden"
      rounded={currentSize === 'avatar-xs' ? 'md' : 'lg'}
      border={currentSize === 'avatar-xs' ? 'base' : '2'}
      borderColor="secondary"
      bgColor="black"
      shadow="inner"
      style={{ aspectRatio: '3/4' }}
      className={cn(
        'group',
        currentVariant === 'hero' && 'border-(--color-primary) ring-2 ring-(--color-primary)/20 shadow-[0_0_15px_-5px_var(--color-primary)]'
      )}
      align="center"
      justify="center"
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className={avatarImageVariants({ variant: currentVariant })}
        />
      ) : (
        <UserIcon color="secondary" size={currentSize === 'avatar-xs' ? 'sm' : 'xl'} />
      )}
    </Stack>
  )
}
