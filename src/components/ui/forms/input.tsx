import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'className'> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Input({ type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <div className="group relative flex w-full items-center">
      {leftIcon && (
        <div className="absolute left-3 z-10 flex items-center justify-center text-(--color-secondary)/60 transition-colors group-focus-within:text-(--color-primary)/80">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          'flex h-10 w-full rounded-md border border-(--color-secondary)/40 bg-black/40 px-3 py-2 text-sm text-(--color-ivory) caret-white shadow-sm backdrop-blur-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-fantasy placeholder:tracking-widest placeholder:text-(--color-secondary)/60 focus-visible:border-(--color-primary)/60 focus-visible:ring-1 focus-visible:ring-(--color-primary) focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          leftIcon && 'pl-10',
          rightIcon && 'pr-10'
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 z-10 flex items-center justify-center text-(--color-secondary)/60 transition-colors group-focus-within:text-(--color-primary)/80">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export { Input }
