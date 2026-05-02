import { useId } from 'react'

import { HelperText } from '@/components/ui/core/typography'
import { resolveFieldId } from '@/components/ui/forms/field-id'

type FieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> & {
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
    <div className="space-y-2">
      <div
        className={
          hasActionLabel
            ? 'flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3'
            : ''
        }
      >
        <label
          className="font-label text-outline block text-xs tracking-[0.22em] uppercase"
          htmlFor={resolvedId}
        >
          {label}
        </label>
        {hasActionLabel ? (
          <button
            className="font-label text-primary disabled:text-outline/70 text-[11px] tracking-[0.18em] whitespace-nowrap uppercase disabled:cursor-not-allowed"
            onClick={onActionClick}
            disabled={!onActionClick}
            type="button"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      <input
        className={[
          'bg-surface-container-lowest/80 text-on-surface placeholder:text-outline/60 w-full rounded-xl border px-4 py-3 transition outline-none focus:ring-2',
          error
            ? 'border-error/65 focus:border-error focus:ring-error/25'
            : 'border-outline-variant/70 focus:border-primary focus:ring-primary/30',
        ].join(' ')}
        id={resolvedId}
        {...props}
      />
      {helperText ? <HelperText tone={error ? 'error' : 'default'}>{helperText}</HelperText> : null}
    </div>
  )
}
