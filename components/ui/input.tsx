import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({
  className,
  type,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <input
      type={type}
      className={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        // Game-themed overrides using game default colors
        'border-[#8b6f47]/50 bg-black/40 text-[#f5e6d3] placeholder:text-[#8b7355] focus:border-[#ffd700] focus:ring-[#ffd700]/20',
        className
      )}
      ref={ref}
      {...props}
    />
  )
}
