import { useId } from 'react'

import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

import { HelperText } from '@/components/ui/core/typography'
import { resolveFieldId } from '@/components/ui/forms/field-id'
import { FormField } from '@/components/ui/forms/form-chrome'

type FieldProps = NativePropsWithoutClassNameStyle<React.InputHTMLAttributes<HTMLInputElement>> & {
  actionLabel?: string
  onActionClick?: () => void
  error?: string
  hint?: string
  label: string
}

export function Field({
  actionLabel,
  error,
  hint,
  id,
  label,
  onActionClick,
  ...props
}: FieldProps) {
  const generatedId = useId()
  const resolvedId = resolveFieldId({
    explicitId: id,
    fallbackSeed: label,
    generatedId,
    prefix: 'field',
  })
  const helperText = error ?? hint
  const hasActionLabel = Boolean(actionLabel)

  return (
    <FormField.Shell>
      <FormField.Header hasAction={hasActionLabel}>
        <FormField.Label htmlFor={resolvedId}>{label}</FormField.Label>
        {hasActionLabel ? (
          <FormField.Action onClick={onActionClick}>{actionLabel}</FormField.Action>
        ) : null}
      </FormField.Header>
      <input
        className={clsx(
          'bg-surface-container-lowest/80 text-on-surface placeholder:text-outline/60 w-full rounded-xl border px-(--space-field-x) py-(--space-field-y) transition outline-none focus:ring-2',
          error
            ? 'border-error/65 focus:border-error focus:ring-error/25'
            : 'border-outline-variant/70 focus:border-primary focus:ring-primary/30'
        )}
        id={resolvedId}
        {...props}
      />
      {helperText ? <HelperText tone={error ? 'error' : 'default'}>{helperText}</HelperText> : null}
    </FormField.Shell>
  )
}
