import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { HStack, type StackProps, VStack } from './stack'
import { Caption, H3 } from './typography'

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-border bg-card',
        game: 'border-2 border-game-wood bg-linear-to-br from-[#1a1408] to-[#2a1f10] shadow-[0_4px_20px_rgba(0,0,0,0.5)]',
        muted: 'border border-game-wood/30 bg-black-40',
        danger: 'border border-red-900/50 bg-black/80 shadow-red-900/20',
        row: 'border border-game-wood/30 bg-black-40 transition-colors hover:border-game-gold-muted hover:bg-black-60',
        dialog: 'border-2 border-game-gold-muted bg-black/90 shadow-2xl backdrop-blur-md',
      },
      fullHeight: {
        true: 'h-full',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      /** Backdrop Blur */
      backdrop: {
        true: 'backdrop-blur-md bg-black/80',
        medium: 'backdrop-blur-md bg-black/60',
        small: 'backdrop-blur-sm bg-black/40',
        false: '',
      },
      /** Background Color */
      bg: {
        none: '',
        black: 'bg-black',
        'black-80': 'bg-black/80',
        'black-60': 'bg-black/60',
        'black-40': 'bg-black/40',
        card: 'bg-card',
      },
      /** Position */
      position: {
        relative: 'relative',
        absolute: 'absolute',
        fixed: 'fixed',
        sticky: 'sticky',
      },
      /** Border */
      border: {
        none: '',
        default: 'border border-border',
        game: 'border border-[#8b6f47]/30',
        gold: 'border border-[#ffd700]/30',
        'gold-muted': 'border border-[#d4a574]/30',
        success: 'border border-[#6fbf6f]/30',
        danger: 'border border-[#ff6b6b]/30',
        info: 'border border-[#69ccf0]/30',
        magic: 'border border-[#b66bd4]/30',
      },
    },
    defaultVariants: {
      variant: 'default',
      fullHeight: false,
      fullWidth: false,
      backdrop: false,
      bg: 'none',
      position: 'relative',
      border: 'none',
    },
  }
)

function CornerDecorations() {
  const corners = [
    'top-0 left-0 border-t-2 border-l-2',
    'top-0 right-0 border-t-2 border-r-2',
    'bottom-0 left-0 border-b-2 border-l-2',
    'right-0 bottom-0 border-r-2 border-b-2',
  ]

  const dots = ['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'right-1 bottom-1']

  return (
    <VStack position="absolute" inset="0" z="20" interactive={false}>
      {corners.map((pos, i) => (
        <VStack
          key={i}
          position="absolute"
          h="10"
          w="10"
          _internalClassName={cn('border-game-gold-muted/40', pos)}
        >
          <VStack
            position="absolute"
            h="2"
            w="2"
            rounded="full"
            bg="gold-muted"
            _internalClassName={dots[i]}
          />
        </VStack>
      ))}
    </VStack>
  )
}

function TexturedOverlay() {
  return (
    <>
      <VStack
        position="absolute"
        inset="0"
        z="0"
        interactive={false}
        _internalClassName="bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] opacity-50"
      />
      <VStack
        position="absolute"
        inset="0"
        z="0"
        interactive={false}
        _internalStyle={{
          opacity: 0.03,
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 2px, #000 3px)',
        }}
      />
    </>
  )
}

export interface CardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>,
    VariantProps<typeof cardVariants> {
  className?: string
  /** @deprecated use className */
  _internalClassName?: string
  decorated?: boolean
  textured?: boolean
}

export function Card({
  variant,
  fullHeight,
  fullWidth,
  backdrop,
  bg,
  position,
  border,
  decorated,
  textured,
  className,
  _internalClassName,
  children,
  ...props
}: CardProps) {
  return (
    <VStack
      _internalClassName={cn(
        cardVariants({ variant, fullHeight, fullWidth, backdrop, bg, position, border }),
        className || _internalClassName
      )}
      {...props}
    >
      {textured && <TexturedOverlay />}
      {decorated && <CornerDecorations />}
      {children}
    </VStack>
  )
}

export function CardHeader({
  disablePadding = false,
  className,
  _internalClassName,
  ...props
}: StackProps & { disablePadding?: boolean }) {
  return (
    <VStack
      border="game-b"
      p={disablePadding ? 'none' : 'md'}
      gap="xs"
      _internalClassName={cn(className, _internalClassName)}
      {...props}
    />
  )
}

export function CardTitle({ ...props }: React.ComponentProps<typeof H3>) {
  return <H3 font="fantasy" color="gold" _internalClassName="mb-1" {...props} />
}

export function CardDescription(props: React.ComponentProps<typeof Caption>) {
  return <Caption color="muted" {...props} />
}

export function CardContent({
  disablePadding = false,
  className,
  _internalClassName,
  ...props
}: StackProps & {
  disablePadding?: boolean
}) {
  return (
    <VStack
      flex="1"
      p={disablePadding ? 'none' : 'md'}
      _internalClassName={cn(className, _internalClassName)}
      {...props}
    />
  )
}

export function CardFooter({ className, _internalClassName, ...props }: StackProps) {
  return (
    <HStack
      mt="auto"
      border="game-t"
      p="md"
      _internalClassName={cn(className, _internalClassName)}
      {...props}
    />
  )
}

// Dot-notation exports
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter
