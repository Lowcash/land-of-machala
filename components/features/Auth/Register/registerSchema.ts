import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Neplatný email'),
  password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků'),
})

export type RegisterValues = z.infer<typeof registerSchema>
