import * as React from 'react'

import { cn } from '@/lib/utils'

export function Card({
  className,
  variant = 'default',
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'game' | 'muted'
  ref?: React.Ref<HTMLDivElement>
}) {
  const variantStyles = {
    default: 'rounded-lg border bg-card text-card-foreground shadow-sm',
    // Game Panel: Dark wood/metal aesthetic with borders
    game: 'rounded-lg border-2 border-[#8b6f47] bg-linear-to-br from-[#1a1408] to-[#2a1f10] shadow-[0_4px_20px_rgba(0,0,0,0.5)]',
    // Muted Panel: For less important sections
    muted: 'rounded-lg border border-[#8b6f47]/30 bg-black/40',
  }

  return <div ref={ref} className={cn(variantStyles[variant], className)} {...props} />
}

export function CardHeader({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CardTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <h3
      ref={ref}
      className={cn(
        'font-medieval text-game-gold text-2xl leading-none font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return <p ref={ref} className={cn('text-game-copper-muted text-sm', className)} {...props} />
}

export function CardContent({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
}

export function CardFooter({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
