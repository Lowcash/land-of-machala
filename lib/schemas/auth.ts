import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Neplatná e-mailová adresa'),
  password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků'),
})

export const registerSchema = z.object({
  email: z.string().email('Neplatná e-mailová adresa'),
  username: z
    .string()
    .min(3, 'Uživatelské jméno musí mít alespoň 3 znaky')
    .max(20, 'Uživatelské jméno může mít maximálně 20 znaků')
    .regex(/^[a-zA-Z0-9_]+$/, 'Uživatelské jméno může obsahovat pouze písmena, čísla a podtržítka')
    .optional(),
  password: z.string().min(6, 'Heslo musí mít alespoň 6 znaků'),
})
