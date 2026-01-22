import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/lib/utils'

const typographyVariants = cva('text-game-fg', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-medieval text-game-gold',
      h2: 'scroll-m-20 border-b border-game-copper/20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-medieval text-game-gold',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight font-medieval text-game-gold-muted',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight font-medieval text-game-copper-muted',
      p: 'leading-7 [&:not(:first-child)]:mt-6 font-body',
      blockquote: 'mt-6 border-l-2 border-game-copper pl-6 italic font-body text-game-copper-muted',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2 font-body',
      lead: 'text-xl text-muted-foreground font-body',
      large: 'text-lg font-semibold font-body',
      small: 'text-sm font-medium leading-none font-body',
      muted: 'text-sm text-muted-foreground font-body',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

interface TypographyProps
  extends
    React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'blockquote'
}

export function Typography({ className, variant, as, children, ...props }: TypographyProps) {
  const Comp =
    as ||
    (variant === 'lead' || variant === 'large' || variant === 'small' || variant === 'muted'
      ? 'p'
      : variant || 'p')

  return (
    // @ts-ignore - Dynamic component type
    <Comp className={cn(typographyVariants({ variant, className }))} {...props}>
      {children}
    </Comp>
  )
}
