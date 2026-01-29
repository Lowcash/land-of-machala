'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export function Avatar({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
}

export function AvatarImage({
  className,
  alt = 'Avatar',
  ref,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { ref?: React.Ref<HTMLImageElement> }) {
  return (
    <img ref={ref} alt={alt} className={cn('aspect-square h-full w-full', className)} {...props} />
  )
}

export function AvatarFallback({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-muted flex h-full w-full items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  )
}
