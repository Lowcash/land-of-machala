const VARIANT_CLASSES = {
  ghost: 'text-primary hover:text-white focus-visible:ring-primary bg-transparent hover:bg-white/5',
  primary:
    'bg-primary-container text-on-primary hover:bg-primary focus-visible:ring-primary border border-primary/45',
  secondary:
    'bg-surface-container-high text-primary hover:bg-secondary-container focus-visible:ring-primary border border-white/10',
} as const

const SIZE_CLASSES = {
  md: 'px-4 py-3 text-sm tracking-[0.2em]',
  lg: 'px-5 py-4 text-base tracking-[0.22em]',
} as const

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
  fullWidth?: boolean
  variant?: keyof typeof VARIANT_CLASSES
  size?: keyof typeof SIZE_CLASSES
}

export function Button({
  fullWidth = false,
  size = 'lg',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'font-label inline-flex transform-gpu cursor-pointer items-center justify-center rounded-xl font-semibold uppercase transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
        fullWidth ? 'w-full' : '',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
      ].join(' ')}
      type={type}
      {...props}
    />
  )
}
