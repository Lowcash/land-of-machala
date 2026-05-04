import { useId } from 'react'

import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

import { HelperText } from '@/components/ui/core/typography'
import {
  TEXT_INPUT_BASE_CLASS,
  TEXT_INPUT_STATE_CLASS,
} from '@/components/ui/forms/field-chrome-classes'
import { resolveFieldId } from '@/components/ui/forms/field-id'
import { FormField } from '@/components/ui/forms/form-field-chrome'

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
        <FormField.Label error={!!error} htmlFor={resolvedId}>
          {label}
        </FormField.Label>
        {hasActionLabel ? (
          <FormField.Action onClick={onActionClick}>{actionLabel}</FormField.Action>
        ) : null}
      </FormField.Header>
      <input
        className={clsx(
          TEXT_INPUT_BASE_CLASS,
          error ? TEXT_INPUT_STATE_CLASS.error : TEXT_INPUT_STATE_CLASS.default
        )}
        id={resolvedId}
        {...props}
      />
      {helperText ? <HelperText tone={error ? 'error' : 'default'}>{helperText}</HelperText> : null}
    </FormField.Shell>
  )
}
