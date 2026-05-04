export const TEXT_INPUT_BASE_CLASS =
  'bg-surface-container-lowest/80 text-on-surface placeholder:text-outline/60 w-full rounded-xl border px-(--space-field-x) py-(--space-field-y) transition outline-none focus:ring-2'

export const TEXT_INPUT_STATE_CLASS = {
  default: 'border-outline-variant/70 focus:border-primary focus:ring-primary/30',
  error: 'border-error/65 focus:border-error focus:ring-error/25',
} as const

export const CHECKBOX_SURFACE_BASE_CLASS =
  'bg-surface-container-lowest/80 group-hover:border-primary/55 peer-checked:border-primary peer-checked:bg-primary h-5 w-5 cursor-pointer rounded-md border transition peer-focus-visible:ring-2'

export const CHECKBOX_SURFACE_STATE_CLASS = {
  default: 'border-outline-variant peer-focus-visible:ring-primary/30',
  error: 'border-error/65 peer-focus-visible:ring-error/25',
} as const
