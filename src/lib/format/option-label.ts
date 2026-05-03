const OPTION_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function getOptionLabel(index: number) {
  return OPTION_LABELS[index] ?? `${index + 1}`
}
