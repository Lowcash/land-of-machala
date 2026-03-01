/**
 * Typed UI label contracts for the Register feature.
 */

export interface RegisterUiLabels {
  email: string
  emailPlaceholder: string
  password: string
  confirmPassword: string
  submit: string
  validation: {
    emailInvalid: string
    passwordLength: string
    passwordRequired: string
    passwordMismatch: string
  }
}
