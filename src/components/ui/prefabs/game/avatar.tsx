import Image from 'next/image'

import { cva } from 'class-variance-authority'

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

export type AvatarSize = 'sm' | 'md' | 'lg' | 'avatar' | 'avatar-sm' | 'avatar-xs' | 'avatar-lg'

interface AvatarProps {
  image?: string
  name: string
  variant?: 'default' | 'hero'
  size?: AvatarSize
  sm?: Partial<Omit<AvatarProps, 'sm' | 'name'>>
}

export function Avatar({ image, name, size = 'avatar', variant, sm }: AvatarProps) {
  const currentSize = sm?.size || size
  const currentVariant = sm?.variant || variant
  const isHero = currentVariant === 'hero'

  // Standardize size mapping to ensure both width and height tokens are applied
  const sizeValue =
    currentSize === 'avatar-lg' || currentSize === 'lg'
      ? 'avatar-lg'
      : currentSize === 'avatar' || currentSize === 'md'
        ? 'avatar'
        : currentSize === 'avatar-sm' || currentSize === 'sm'
          ? 'avatar-sm'
          : 'avatar-xs'

  return (
    <Stack
      width={sizeValue}
      height={sizeValue}
      position="relative"
      rounded={currentSize === 'avatar-xs' ? 'md' : 'lg'}
      border={currentSize === 'avatar-xs' ? 'base' : '2'}
      borderColor={isHero ? 'primary' : 'secondary'}
      bgColor="black"
      shadow="inner"
      className={cn(
        'group relative overflow-hidden',
        isHero && 'shadow-[0_0_15px_-5px_var(--color-primary)] ring-2 ring-(--color-primary)/20'
      )}
      align="center"
      justify="center"
    >
      {/* Inner Frame for the "framed portrait" look */}
      <div className="pointer-events-none absolute inset-0 z-10 border border-white/5" />
      <div className="pointer-events-none absolute inset-px z-10 border border-black/40" />

      {image ? (
        <Image src={image} alt={name} fill className="z-0 object-cover" />
      ) : (
        <UserIcon
          color="secondary"
          size={currentSize === 'avatar-xs' ? 'sm' : 'xl'}
          className="z-0"
        />
      )}
    </Stack>
  )
}
