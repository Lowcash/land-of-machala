import * as React from 'react'

import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({ label, id: providedId, ...props }: Omit<CheckboxProps, 'className'>) {
  const generatedId = React.useId()
  const id = providedId || generatedId

  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex cursor-pointer items-center gap-2 select-none',
        props.disabled && 'cursor-not-allowed'
      )}
    >
      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input id={id} type="checkbox" className="peer sr-only" {...props} />
        <div
          className={cn(
            'h-full w-full rounded border-2 border-(--color-secondary)/60 bg-black/40 shadow-sm transition-all',
            'peer-checked:border-(--color-primary) peer-checked:bg-(--color-primary)/20',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-(--color-primary) peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black',
            'group-hover:border-(--color-primary)/60',
            'peer-disabled:opacity-50 peer-disabled:group-hover:border-(--color-secondary)/60'
          )}
        />
        <svg
          className="pointer-events-none absolute h-3.5 w-3.5 text-(--color-primary) opacity-0 transition-opacity peer-checked:opacity-100 peer-disabled:opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {label && (
        <span
          className={cn(
            'font-fantasy text-sm whitespace-nowrap text-(--color-ivory)/80 transition-colors group-hover:text-(--color-ivory)',
            'peer-disabled:text-(--color-ivory)/40 peer-disabled:group-hover:text-(--color-ivory)/40'
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}
