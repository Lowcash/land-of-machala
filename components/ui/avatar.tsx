'use client'

import * as React from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export function Avatar({ className, ref, ...props }: AvatarProps) {
  return (
    <div
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
}

interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  ref?: React.Ref<HTMLImageElement>
}

export function AvatarImage({ className, alt = 'Avatar', ref, ...props }: AvatarImageProps) {
  return (
    <Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      alt={alt}
      width={props.width || 40}
      height={props.height || 40}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  name?: string
}

export function AvatarFallback({ className, name, children, ref, ...props }: AvatarFallbackProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : null

  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-[#2a2a2a] text-xs font-bold text-[#ffd700]',
        className
      )}
      style={{ fontFamily: 'var(--font-fantasy)' }}
      {...props}
    >
      {children || initials || '?'}
    </div>
  )
}
