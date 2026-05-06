import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

const VARIANT_CLASSES = {
  ghost:
    'border-transparent text-primary hover:text-white focus-visible:ring-primary bg-transparent hover:bg-white/5',
  primary:
    'border-primary/45 bg-primary-container text-on-primary hover:bg-primary focus-visible:ring-primary',
  secondary:
    'border-white/10 bg-surface-container-high text-primary hover:bg-secondary-container focus-visible:ring-primary',
} as const

type ButtonProps = NativePropsWithoutClassNameStyle<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> & {
  fullWidth?: boolean
  variant?: keyof typeof VARIANT_CLASSES
}

export function Button({
  fullWidth = false,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-label inline-flex transform-gpu cursor-pointer items-center justify-center rounded-xl border font-semibold uppercase transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
        fullWidth && 'w-full',
        VARIANT_CLASSES[variant]
      )}
      type={type}
      {...props}
    />
  )
}
