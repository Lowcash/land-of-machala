import Image from 'next/image'

import { type VariantProps, cva } from 'class-variance-authority'
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
  size?: 'sm' | 'md' | 'lg' | 'avatar' | 'avatar-sm' | 'avatar-xs'
  sm?: Partial<Omit<AvatarProps, 'sm' | 'md' | 'lg' | 'xl' | 'name'>>
}

export function Avatar({ image, name, size = 'avatar', variant, sm }: AvatarProps) {
  const currentSize = sm?.size || size
  const currentVariant = sm?.variant || variant
  
  return (
    <Stack
      height={
        currentSize === 'avatar' || currentSize === 'avatar-sm' || currentSize === 'avatar-xs'
          ? currentSize
          : 'auto'
      }
      width={
        currentSize === 'avatar' || currentSize === 'avatar-sm' || currentSize === 'avatar-xs'
          ? currentSize
          : 'auto'
      }
      position="relative"
      overflow="hidden"
      rounded={currentSize === 'avatar-xs' ? 'md' : 'lg'}
      border={currentSize === 'avatar-xs' ? 'base' : '2'}
      borderColor="secondary"
      bgColor="black"
      shadow="inner"
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
