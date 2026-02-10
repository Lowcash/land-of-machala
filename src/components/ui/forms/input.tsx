import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'className'> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Input({ type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      {leftIcon && (
        <div className="absolute left-3 flex items-center justify-center text-(--color-secondary)/60">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'flex h-10 w-full rounded-md border border-(--color-secondary)/40 bg-black/40 px-3 py-2 text-sm text-(--color-ivory) shadow-sm backdrop-blur-sm transition-all caret-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-(--color-secondary)/60 focus-visible:border-(--color-primary)/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-primary) disabled:cursor-not-allowed disabled:opacity-50',
          leftIcon && 'pl-10',
          rightIcon && 'pr-10'
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 flex items-center justify-center text-(--color-secondary)/60">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export { Input }
