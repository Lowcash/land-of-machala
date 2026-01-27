import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Neplatný email'),
  password: z.string().min(1, 'Heslo je povinné'),
  rememberMe: z.boolean(),
})

export type LoginValues = z.infer<typeof loginSchema>
