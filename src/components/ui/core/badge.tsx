import { type VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva(
  'flex shrink-0 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-all font-fantasy uppercase tracking-wider',
  {
    variants: {
      variant: {
        primary: 'border-(--color-gold)/50 bg-black/80 text-(--color-gold)',
        danger: 'border-(--color-danger)/50 bg-(--color-danger)/20 text-(--color-danger)',
        success: 'border-(--color-success)/50 bg-(--color-success)/20 text-(--color-success)',
      },
      size: {
        sm: 'h-6 px-2 text-[10px]',
        md: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
)

interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'>,
    VariantProps<typeof badgeVariants> {
  sm?: VariantProps<typeof badgeVariants>
}

export function Badge({ children, variant, size, sm, ...props }: BadgeProps) {
  const currentSize = sm?.size || size
  const currentVariant = sm?.variant || variant
  
  return (
    <span className={badgeVariants({ variant: currentVariant, size: currentSize })} {...props}>
      {children}
    </span>
  )
}
