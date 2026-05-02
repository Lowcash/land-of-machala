import { useId } from 'react'

import { HelperText } from '@/components/ui/core/typography'
import { resolveFieldId } from '@/components/ui/forms/field-id'

type CheckboxFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'style' | 'type'
> & {
  error?: string
  label: React.ReactNode
  toggleOnLabelClick?: boolean
}

export function CheckboxField({
  error,
  id,
  label,
  toggleOnLabelClick = true,
  ...props
}: CheckboxFieldProps) {
  const generatedId = useId()
  const resolvedId = resolveFieldId({
    explicitId: id,
    fallbackSeed: typeof label === 'string' ? label : undefined,
    generatedId,
    prefix: 'checkbox',
  })

  return (
    <div className="space-y-2">
      <div className="group flex items-start gap-3">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input className="peer sr-only" id={resolvedId} type="checkbox" {...props} />
          <label
            className={[
              'bg-surface-container-lowest/80 group-hover:border-primary/55 peer-checked:border-primary peer-checked:bg-primary h-5 w-5 cursor-pointer rounded-md border transition peer-focus-visible:ring-2',
              error
                ? 'border-error/65 peer-focus-visible:ring-error/25'
                : 'border-outline-variant peer-focus-visible:ring-primary/30',
            ].join(' ')}
            htmlFor={resolvedId}
          />
          <svg
            aria-hidden="true"
            className="text-on-primary pointer-events-none absolute h-3.5 w-3.5 scale-90 opacity-0 transition peer-checked:scale-100 peer-checked:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12.5L10 17L19 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </svg>
        </span>
        {toggleOnLabelClick ? (
          <label
            className={[
              error ? 'text-on-surface' : 'text-on-surface-variant',
              'cursor-pointer text-sm leading-6',
            ].join(' ')}
            htmlFor={resolvedId}
          >
            {label}
          </label>
        ) : (
          <span
            className={[
              error ? 'text-on-surface' : 'text-on-surface-variant',
              'text-sm leading-6',
            ].join(' ')}
          >
            {label}
          </span>
        )}
      </div>
      {error ? <HelperText tone="error">{error}</HelperText> : null}
    </div>
  )
}
