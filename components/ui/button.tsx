import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Game Specific Variants
        'game-primary':
          'font-fantasy tracking-wide border-2 border-[#8b6f47] bg-linear-to-br from-[#1a1408] to-[#2a1f10] text-[#d4a574] hover:border-[#d4a574] hover:text-[#ffd700] hover:shadow-[0_0_10px_rgba(212,165,116,0.2)]',
        'game-secondary':
          'font-fantasy tracking-wide border border-[#8b6f47]/50 bg-black/40 text-[#8b7355] hover:border-[#8b6f47] hover:text-[#d4a574]',
        'game-action':
          'font-fantasy tracking-wide bg-linear-to-r from-[#8b6f47] to-[#6d5a3e] text-[#f5e6d3] border border-[#d4a574]/30 hover:brightness-110 shadow-md',
        'game-danger':
          'font-fantasy tracking-wide border border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-950/50 hover:border-red-500/50 hover:text-red-300',
        'game-ghost':
          'font-fantasy tracking-wide border-2 border-[#8b6f47] bg-[#8b6f47]/10 text-[#d4a574] hover:bg-[#8b6f47]/20 hover:border-[#ffd700] hover:text-[#ffd700] transition-all duration-300 font-bold',
        'game-choice':
          'font-fantasy tracking-wide border border-[#8b6f47] bg-black/60 text-[#f5e6d3] hover:scale-[1.02] hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] transition-all whitespace-normal h-auto py-3 sm:py-4',
        'game-link-subtle':
          'text-[#8b7355] hover:text-[#ffd700] bg-transparent hover:bg-transparent p-0 h-auto font-normal',
        'game-danger-ghost':
          'font-fantasy tracking-wide border border-[#8b6f47] bg-black/60 text-[#ff6b6b] hover:border-[#ff6b6b] hover:bg-[#ff6b6b]/10 transition-colors',
        'game-outline-highlight':
          'font-fantasy tracking-wide border-2 border-[#d4a574] bg-transparent text-[#ffd700] hover:scale-[1.02] hover:bg-[#d4a574]/10 transition-all',
      },
      size: {
        default: 'h-[42px] px-6 text-sm',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        // Game Specific Sizes
        'game-sm': 'h-7 px-2 text-xs uppercase tracking-wide font-bold',
        'game-md': 'h-10 px-4 text-sm uppercase tracking-wide font-bold',
        'game-lg': 'h-12 px-6 text-lg uppercase tracking-wide font-bold',
        'game-icon': 'h-10 w-10 p-2',
        'game-compact': 'px-3 py-1.5 h-auto text-sm', // For LogoutButton
        'game-tall': 'min-h-[44px] py-2 sm:min-h-0 sm:py-3 w-full h-auto', // For SkillUpgradeButton
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export function Button({
  className,
  variant,
  size,
  fullWidth = false,
  asChild = false,
  loading = false,
  icon: Icon,
  label,
  responsiveLabel = false,
  children,
  disabled,
  ref,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    fullWidth?: boolean
    icon?: React.ElementType
    label?: React.ReactNode
    responsiveLabel?: boolean
    ref?: React.Ref<HTMLButtonElement>
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), fullWidth && 'w-full')}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {children || label}
        </>
      ) : (
        <>
          {Icon && <Icon className={cn('h-4 w-4', !label && !children && 'mr-0')} />}
          {label && <span className={cn(responsiveLabel && 'hidden sm:inline')}>{label}</span>}
          {children}
        </>
      )}
    </Comp>
  )
}

export { buttonVariants }
