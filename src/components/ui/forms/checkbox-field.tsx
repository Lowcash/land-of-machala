import { useId } from 'react'

import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

import { HelperText } from '@/components/ui/core/typography'
import { resolveFieldId } from '@/components/ui/forms/field-id'
import { FormField } from '@/components/ui/forms/form-field-chrome'

const CHECKBOX_SURFACE_BASE_CLASS =
  'bg-surface-container-lowest/80 group-hover:border-primary/55 peer-checked:border-primary peer-checked:bg-primary h-5 w-5 cursor-pointer border transition peer-focus-visible:ring-2 md:h-6 md:w-6'

const CHECKBOX_SURFACE_STATE_CLASS = {
  default: 'border-outline-variant peer-focus-visible:ring-primary/30',
  error: 'border-error/65 peer-focus-visible:ring-error/25',
} as const

type CheckboxFieldProps = Omit<
  NativePropsWithoutClassNameStyle<React.InputHTMLAttributes<HTMLInputElement>>,
  'type'
> & {
  error?: string
  label: React.ReactNode
}

export function CheckboxField({ error, id, label, ...props }: CheckboxFieldProps) {
  const generatedId = useId()
  const resolvedId = resolveFieldId({
    explicitId: id,
    fallbackSeed: typeof label === 'string' ? label : undefined,
    generatedId,
    prefix: 'checkbox',
  })

  return (
    <FormField.Shell>
      <FormField.Inline>
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center md:h-6 md:w-6">
          <input className="peer sr-only" id={resolvedId} type="checkbox" {...props} />
          <label
            className={clsx(
              CHECKBOX_SURFACE_BASE_CLASS,
              error ? CHECKBOX_SURFACE_STATE_CLASS.error : CHECKBOX_SURFACE_STATE_CLASS.default
            )}
            htmlFor={resolvedId}
          />
          <svg
            aria-hidden="true"
            className="text-on-primary pointer-events-none absolute h-3.5 w-3.5 scale-90 opacity-0 transition peer-checked:scale-100 peer-checked:opacity-100 md:h-4 md:w-4"
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
        <FormField.ControlLabel error={Boolean(error)} htmlFor={resolvedId}>
          {label}
        </FormField.ControlLabel>
      </FormField.Inline>
      {error ? <HelperText tone="error">{error}</HelperText> : null}
    </FormField.Shell>
  )
}
