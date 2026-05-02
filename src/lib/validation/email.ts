export const EMAIL_PATTERN = /.+@.+\..+/

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim())
}
