import { type VariantProps, cva } from 'class-variance-authority'

const badgeVariants = cva(
  'flex shrink-0 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-all font-fantasy uppercase tracking-wider',
  {
    variants: {
      variant: {
        primary: 'border-(--color-secondary)/40 text-(--color-ivory)',
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
    VariantProps<typeof badgeVariants> {}

export function Badge({ children, variant, size, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, size })} {...props}>
      {children}
    </span>
  )
}
