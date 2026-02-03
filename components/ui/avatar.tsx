'use client'

import * as React from 'react'

import Image from 'next/image'

import { type VariantProps, cva } from 'class-variance-authority'

import { VStack } from './stack'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full border border-[#8b6f47] transition-colors',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-20 w-20',
      },
      variant: {
        default: 'bg-black',
        enemy: 'border-red-900 bg-red-950',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof avatarVariants> {
  ref?: React.Ref<HTMLDivElement>
}

export function Avatar({ size, variant, ref, ...props }: AvatarProps) {
  return <VStack ref={ref} _internalClassName={avatarVariants({ size, variant })} {...props} />
}

interface AvatarImageProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, 'className'> {
  ref?: React.Ref<HTMLImageElement>
}

export function AvatarImage({ alt = 'Avatar', ref, ...props }: AvatarImageProps) {
  if (!props.src) return null

  return (
    <Image
      ref={ref}
      className="aspect-square h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
      alt={alt}
      width={props.width || 80}
      height={props.height || 80}
      {...props}
    />
  )
}

const fallbackVariants = cva('h-full w-full transition-colors', {
  variants: {
    variant: {
      default: 'text-[#ffd700]',
      muted: 'text-[#8b7355]',
      enemy: 'text-red-500/70',
      player: 'text-[#d4a574]/70',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface AvatarFallbackProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>,
    VariantProps<typeof fallbackVariants> {
  ref?: React.Ref<HTMLDivElement>
  name?: string
}

export function AvatarFallback({ name, children, variant, ref, ...props }: AvatarFallbackProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : null

  return (
    <VStack
      ref={ref}
      align="center"
      justify="center"
      rounded="full"
      bg="black-40"
      _internalClassName={fallbackVariants({ variant })}
      _internalStyle={{ fontFamily: 'var(--font-fantasy)' }}
      {...props}
    >
      {children || initials || '?'}
    </VStack>
  )
}
