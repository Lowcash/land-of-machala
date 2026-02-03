import * as React from 'react'

import Link from 'next/link'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

import { HStack, VStack } from './stack'
import { Caption, Span } from './typography'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        // Standard variants (for fallback/internal)
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Consolidated Game Variants
        primary:
          'font-fantasy tracking-wide border-2 border-game-copper bg-linear-to-br from-game-copper to-black text-game-gold-muted shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:from-black hover:to-game-copper hover:shadow-[0_4px_15px_rgba(0,0,0,0.6)]',
        secondary_game:
          'font-fantasy tracking-wide border border-game-copper/50 bg-black/40 text-game-copper-muted hover:border-game-copper hover:text-game-gold-muted',
        danger: 'border-game-danger/40 bg-game-danger/10 text-game-danger hover:bg-game-danger/20',
        success:
          'border-game-success/50 bg-game-success/10 text-game-success hover:bg-game-success/20',
        ghost_game: 'border-transparent bg-transparent text-game-gold-muted hover:bg-black/40',
        choice:
          'font-fantasy tracking-wide border border-game-copper bg-black/60 text-game-gold-muted hover:scale-[1.02] hover:border-game-gold hover:bg-game-copper/20 hover:text-game-gold transition-all whitespace-normal h-auto py-3 sm:py-4 text-xs sm:text-sm md:text-base min-h-16',
        link_game:
          'text-game-copper-muted hover:text-game-gold bg-transparent hover:bg-transparent p-0 h-auto font-normal',
        row: 'border border-game-copper/30 bg-black/40 p-2.5 text-game-gold-muted transition-colors hover:border-game-gold-muted hover:bg-black/60',
        marker:
          'relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-game-gold-muted bg-linear-to-br from-game-copper to-black p-0 transition-all hover:scale-110 shadow-lg',
        magic_game: 'border-game-magic text-game-magic bg-black/40 hover:bg-game-magic/10',
        muted_game: 'text-game-copper-muted hover:text-game-gold-muted hover:bg-white/5',
        black_market:
          'border border-game-magic/30 bg-black/80 text-game-magic hover:border-game-magic hover:bg-black/90 transition-all',
      },
      size: {
        default: 'h-[42px] px-6 text-sm',
        xs: 'h-7 px-2 text-[10px] uppercase tracking-wide font-bold',
        sm: 'h-8 px-3 text-xs uppercase tracking-wide font-bold',
        md: 'h-10 px-4 text-sm uppercase tracking-wide font-bold',
        lg: 'h-12 px-6 text-lg uppercase tracking-wide font-bold',
        icon: 'h-10 w-10 p-2',
        'icon-xs': 'h-6 w-6 p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonContentProps {
  loading?: boolean
  icon?: React.ElementType
  label?: React.ReactNode
  subLabel?: string
  subLabelRight?: string
  indicator?: React.ReactNode
  children?: React.ReactNode
}

function ButtonContent({
  loading,
  icon: Icon,
  label,
  subLabel,
  subLabelRight,
  indicator,
  children,
}: ButtonContentProps) {
  // If no content is provided, render nothing (allows marker variant to render its own specific children)
  const finalLabel = label || children

  if (!loading && !Icon && !finalLabel && !subLabel && !indicator) return null

  return (
    <HStack align="center" gap="sm" fullWidth>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {indicator && (
            <VStack
              shrink="0"
              h="8"
              w="8"
              align="center"
              justify="center"
              rounded="full"
              border="copper"
              bg="black-40"
              _internalClassName="text-game-copper-muted group-hover:border-game-gold group-hover:text-game-gold text-[10px] transition-colors"
            >
              {indicator}
            </VStack>
          )}
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
        </>
      )}
      <VStack flex="1" align="start" justify="center" leading="tight" gap="none">
        <HStack justify="between" align="center" fullWidth gap="none">
          {finalLabel && (
            <Span weight="bold" _internalClassName="text-left">
              {finalLabel}
            </Span>
          )}
          {subLabelRight && (
            <Caption weight="medium" opacity="80">
              {subLabelRight}
            </Caption>
          )}
        </HStack>
        {subLabel && (
          <Caption weight="medium" opacity="70">
            {subLabel}
          </Caption>
        )}
      </VStack>
    </HStack>
  )
}

export interface ButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'className' | 'children' | 'label' | 'style' | 'ref'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ElementType
  label?: React.ReactNode
  subLabel?: string
  subLabelRight?: string
  indicator?: React.ReactNode
  href?: React.ComponentProps<typeof Link>['href']
  children?: React.ReactNode // Public for marker/asChild use cases
  style?: React.CSSProperties // Allow style for absolute positioning (Map Markers)
}

export function Button({
  variant,
  size,
  fullWidth = false,
  asChild = false,
  loading = false,
  icon: Icon,
  label,
  subLabel,
  subLabelRight,
  indicator,
  href,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const isMarker = variant === 'marker'
  const baseClasses = cn(
    'group',
    buttonVariants({ variant, size: isMarker ? undefined : size }),
    fullWidth && 'w-full'
  )

  const content = isMarker ? (
    children
  ) : (
    <ButtonContent
      loading={loading}
      icon={Icon}
      label={label}
      subLabel={subLabel}
      subLabelRight={subLabelRight}
      indicator={indicator}
    >
      {children}
    </ButtonContent>
  )

  const inner =
    asChild || href
      ? React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<{ children?: React.ReactNode }>,
            {},
            content ||
              (children as React.ReactElement<{ children?: React.ReactNode }>).props.children
          )
        : children
      : content

  if (href) {
    return (
      <Link
        // @ts-expect-error - Next.js Link href typing is overly strict for generic components
        href={href as string}
        className={baseClasses}
        style={style}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={baseClasses}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {inner}
    </Comp>
  )
}

export { buttonVariants }
