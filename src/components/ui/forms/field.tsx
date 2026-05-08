import { useId } from 'react'

import clsx from 'clsx'

import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

import { FieldChrome } from '@/components/ui/forms/field-chrome'
import { resolveFieldId } from '@/components/ui/forms/field-id'

type TextInputControlProps = NativePropsWithoutClassNameStyle<
  React.InputHTMLAttributes<HTMLInputElement>
> & {
  invalid?: boolean
}

type FieldProps = NativePropsWithoutClassNameStyle<React.InputHTMLAttributes<HTMLInputElement>> & {
  actionLabel?: string
  error?: string
  hint?: string
  label: string
  onActionClick?: () => void
}

const TEXT_INPUT_BASE_CLASS =
  'bg-surface-container-lowest/80 rounded-control px-(--inset-control-x) py-(--inset-control-y) text-on-surface placeholder:text-outline/60 w-full border transition outline-none focus:ring-2'

const TEXT_INPUT_STATE_CLASS = {
  default: 'border-outline-variant/70 focus:border-primary focus:ring-primary/30',
  error: 'border-error/65 focus:border-error focus:ring-error/25',
} as const

export function TextInputControl({ invalid = false, ...props }: TextInputControlProps) {
  return (
    <input
      className={clsx(
        TEXT_INPUT_BASE_CLASS,
        invalid ? TEXT_INPUT_STATE_CLASS.error : TEXT_INPUT_STATE_CLASS.default
      )}
      {...props}
    />
  )
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
    <FieldChrome.Root>
      <FieldChrome.Header hasAction={hasActionLabel}>
        <FieldChrome.Label error={!!error} htmlFor={resolvedId}>
          {label}
        </FieldChrome.Label>
        {hasActionLabel ? (
          <FieldChrome.Action onClick={onActionClick}>{actionLabel}</FieldChrome.Action>
        ) : null}
      </FieldChrome.Header>
      <TextInputControl id={resolvedId} invalid={Boolean(error)} {...props} />
      {helperText ? (
        <FieldChrome.HelperText tone={error ? 'error' : 'default'}>
          {helperText}
        </FieldChrome.HelperText>
      ) : null}
    </FieldChrome.Root>
  )
}
