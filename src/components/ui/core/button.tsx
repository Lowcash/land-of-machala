import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

const VARIANT_CLASSES = {
  ghost: 'text-primary hover:text-white focus-visible:ring-primary bg-transparent hover:bg-white/5',
  primary:
    'bg-primary-container text-on-primary hover:bg-primary focus-visible:ring-primary border border-primary/45',
  secondary:
    'bg-surface-container-high text-primary hover:bg-secondary-container focus-visible:ring-primary border border-white/10',
} as const

const SIZE_CLASSES = {
  md: 'px-(--space-button-md-x) py-(--space-button-md-y) text-sm tracking-[0.2em]',
  lg: 'px-(--space-button-lg-x) py-(--space-button-lg-y) text-base tracking-[0.22em]',
} as const

type ButtonProps = NativePropsWithoutClassNameStyle<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
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
      className={clsx(
        'font-label inline-flex transform-gpu cursor-pointer items-center justify-center rounded-xl font-semibold uppercase transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
        fullWidth && 'w-full',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size]
      )}
      type={type}
      {...props}
    />
  )
}
