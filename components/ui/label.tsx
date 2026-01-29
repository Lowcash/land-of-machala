import * as React from 'react'

import { cn } from '@/lib/utils'

export function Label({
  className,
  ref,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> }) {
  return (
    <label
      ref={ref}
      className={cn(
        'text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}
